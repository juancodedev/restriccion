import mongoose from 'mongoose';
import dbConnected from './db.js';

dbConnected(function() {

  const kittySchema = mongoose.Schema({
      name: String
  });

  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });

  console.log(silence.name); // 'Silence'


  const fluffy = new Kitten({ name: 'fluffy' });

  fluffy.save(function (err, cat) {
    if (err) { return console.error(err); }
    cat.speak();
  });

});
