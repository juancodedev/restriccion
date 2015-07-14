//import User from '../models/User';
const User = require('../models/User.js');

export function* create(){
  try{
    yield User.create(this.request.body);
    console.log('worked');
    this.body = 'worked';
  }
  catch(e){
    console.log('failed');
    this.body = 'failed';
  }

}
