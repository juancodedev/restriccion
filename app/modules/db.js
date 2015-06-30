import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/tengo-restriccion-dev'); // ToDo: DB-Config

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export default function(callback) {
  db.once('open', callback);
}
