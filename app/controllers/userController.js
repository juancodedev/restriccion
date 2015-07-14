//import User from '../models/User';
const User = require('../models/User.js');

export function* create(){
  try{
    const doc = yield User.create(this.request.body);

    //console.log('User registered');
    this.status = 201;
    this.body = doc;
  }
  catch(e){
    //console.log('Registration Failed');
    this.status = 409;
    this.body = {
    error: {
     errors: [
      {
       reason : 'conflict',
       message: 'El correo que ingresado ya está registrado. Por favor ingrese otro.'
      }
     ],
     code: 409,
     message: 'El correo que ingresado ya está registrado. Por favor ingrese otro.'
     }
    };
  }

}
