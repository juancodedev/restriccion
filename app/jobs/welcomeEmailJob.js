import kue from 'kue';
import {sendWelcomeEmail} from '../modules/mailSender';
import {host} from '../config/redis';
import {log} from '../modules/logger';

const jobs = kue.createQueue({
  redis: {
    host: host
  }
});

/**
 * Job processor
 */
jobs.process('welcome_email', async function (job, done){
  try {
    await sendWelcomeEmail(job.data.user);
    done();
  }
  catch(error) {
    done(error);
  }
});


/**
 * Adds an Welcome email Job to the queue
 * @param  {object} user User Data
 * @return {promise}
 */
export function addWelcomeEmailJob(user){

  const emailJob = jobs.create('welcome_email', {user})
  .priority('high') //priority of the job
  .attempts(5) //Attempts if the job fails
  .backoff({delay: 30000, type: 'fixed'}) //Delay before another attempt when failed
  .ttl(10000); //time to remain active before it is set to failed

  emailJob
    .on('complete', (result) => {
      log.info({'welcomeEmailJob#addWelcomeEmailJob': {status: 'complete', result }});
    })
    .on('failed', (err) => {
      log.error({'welcomeEmailJob#addWelcomeEmailJob': {status: 'failed', error: err }});
    });

  emailJob.save( err => {
    if(err){ throw err; }
  });
}
