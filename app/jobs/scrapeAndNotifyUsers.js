import kue from 'kue';
import {log} from '../modules/logger';
import {fetchNumerosRestriccion} from '../modules/scrape';
import * as RestrictionDay from '../models/RestrictionDay';
import * as User from '../models/User';
import {prepareEmails} from './addEmailJob';

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
      notifyRestrictedUsers(scrapedData);
    }

    await RestrictionDay.set(scrapedData);

    done();
  }
  catch (err) {
    log.error({'scrapeJob#new_scrape': {job, err}});
  }
});

/**
 * Sets a Date time(hours, minutes...) to 0
 * @param  {date} dateTime
 * @return {date}
 */
function flattenTime(dateTime) {
  const unixTime = dateTime.getTime();
  const flatDate = unixTime.toString().substr(0, 7);
  return new Date(Number.parseInt(flatDate));
}


async function notifyRestrictedUsers(restrictionDayData) {
  const users = await User.allWithRestriction(restrictionDayData.numeros);
  prepareEmails(users, restrictionDayData);
}
