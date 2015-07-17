import * as User from '../models/User';
import {log} from '../modules/logger';

export function* create(){
  const query = this.request.body;
  this.type = 'application/json';

  try{
    const doc = yield User.create(query);
    this.status = 201;
    this.body = doc;
  }
  catch(error){
    log.error({'userController#create': { query, error }});

    // TODO: LEER EL ERROR Y MOSTRAR EL ERROR ACORDE
    this.status = 409;
    this.body = {
      errors: [
        {
          status     : 409,
          title      : 'Ya registrado',
          description: 'El correo que ingresado ya está registrado. Por favor ingrese otro'
        }
      ]
    };
  }

}
