import {getLatest} from '../models/RestrictionDay';

export function* latest(){
  this.type = 'application/json';

  try{
    const doc = yield getLatest();
    this.status = 201;
    this.body = doc;
  }
  catch(e){
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
