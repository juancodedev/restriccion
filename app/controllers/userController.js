import * as User from '../models/User';

export function* create(){
  this.type = 'application/json';

  try{
    const doc = yield User.create(this.request.body);
    this.status = 201;
    this.body = doc;
  }
  catch(e){
    console.error(e);

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
