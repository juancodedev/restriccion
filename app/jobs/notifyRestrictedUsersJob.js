import kue from 'kue';
import {splitEvery} from 'ramda';
import {sendRestrictionEmail} from '../modules/mailSender';
import {kueConfig} from '../config/kueConfig';
import {log} from '../modules/logger';

const jobs = kue.createQueue(kueConfig);

/**
 * Job processor
 */
jobs.process('notify_restricted_users', async function (job, done){
  try {
    await sendRestrictionEmail(job.data.users, job.data.info);
    done();
  }
  catch(error) {
    done(error);
  }
});


/**
 * Queues a list of users to notify
 * @param  {array} users Users with restriction
 * @param  {object} info The latest scraped data
 */
export function addNotifyRestrictedUsersJob(users, info){
  const userListChunked = chunkList(users);
  //Add emails to Queue
  userListChunked.forEach(userList => {
    addEmailsToQueue(userList, info);
  });
}


/**
 * Separate a list on an list of chunked arrays
 * @param {array}  list
 * @return {array}
 */
export function chunkList(list) {
  return splitEvery(150, list);
}


/**
 * Adds an email Job to the queue
 * @param  {array, object} email array with the recipient data and scrapedInfo object
 * @return {promise}
 */
export function addEmailsToQueue(users, info){
  const emailJob = jobs.create('notify_restricted_users', {
    users,
    info
  })
  .priority('high') //priority of the job
  .attempts(5) //Attempts if the job fails
  .backoff({delay: 30000, type: 'fixed'}) //Delay before another attempt when failed
  .ttl(10000); //time to remain active before it is set to failed

  emailJob
    .on('complete', (result) => {
      log.info({'notifyRestrictedUsersJob#addEmailsToQueue': {status: 'complete', result }});
    })
    .on('failed', (err) => {
      log.error({'notifyRestrictedUsersJob#addEmailsToQueue': {status: 'failed', error: err }});
    });

  emailJob.save( err => {
    if(err){ throw err; }
  });
}
