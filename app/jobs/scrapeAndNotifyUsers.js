import kue from 'kue';
import {log} from '../modules/logger';
import {project} from 'ramda';
import {fetchNumerosRestriccion} from '../modules/scrape';
import * as RestrictionDay from '../models/RestrictionDay';
import * as User from '../models/User.js';
import {sendEmails} from '../modules/mailSender';

const jobs = kue.createQueue();


/**
 * Schedules recurring scrape and notify users job
 * @param  {number} firstDelay delay in miliseconds to start the first job
 * @param  {number} recurringDelay delay in miliseconds to schedule recurring jobs
 */
export default function scheduleScrapeAndNotifyUsers(firstDelay, recurringDelay){
    const scrapeJob =
      jobs.create('new_scrape')
        .delay(firstDelay) //Milliseconds of delay of the job
        .priority('high') //priority of the job
        .attempts(5) //Attempts if the job fails
        .backoff({delay: 1000 * 60 * 15, type: 'fixed'}) //Delay before another attempt when failed
        .ttl(1000 * 60 * 10); //time to remain active before it is set to failed

    scrapeJob
      .on('complete', (result) => {
        log.info({'scrapeJob#new_scrape': {status: 'complete', result }});
        scheduleScrapeAndNotifyUsers(recurringDelay, recurringDelay);
      })
      .on('failed', (err) => {
        log.error({'scrapeJob#new_scrape': {status: 'failed', error: err }});
      });

    scrapeJob.save( err => {
      if(err){ throw err; }
    });
}


/**
 * Handler for 'new_scrape' Kue Job
 */
jobs.process('new_scrape', async function (job, done){
  log.info({'scrapeJob#new_scrape': job});

  try {
    const scrapedData = await fetchNumerosRestriccion();
    const latestRestrictionDay = await RestrictionDay.getLatest();

    const scrapedRestrictionDayDate = flattenTime(scrapedData.fecha);
    const storedRestrictionDayDate = flattenTime(latestRestrictionDay.fecha);

    if (scrapedRestrictionDayDate > storedRestrictionDayDate) {
      notifyRestrictedUsers(latestRestrictionDay.numeros, scrapedData);
    }

    await RestrictionDay.set(scrapedData);

    done();
  }
  catch (err) {
    log.error({'scrapeJob#new_scrape': {job, err}});
  }
});


function flattenTime(dateTime) {
  dateTime.setHours(0);
  dateTime.setMinutes(0);
  dateTime.setSeconds(0);
  return dateTime;
}


async function notifyRestrictedUsers(numbers, restrictionDayData) {
  const users = User.allWithRestriction(numbers);
  const emails = project([emails], users);
  sendEmails(emails, restrictionDayData);
}
