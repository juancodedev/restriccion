import {getLatest} from '../models/RestrictionDay';
import {log} from '../modules/logger';

export function* latest(){
  this.type = 'application/json';

  try{
    const doc = yield getLatest();
    this.status = 201;
    this.body = doc;
  }
  catch(error){
    log.error({'restrictionDayController#latest': { error }});

    this.status = 500;
    this.body = {
      errors: [
        {
          status: 500,
          title : 'No se pudo encontrar el registro'
        }
      ]
    };
  }

}
