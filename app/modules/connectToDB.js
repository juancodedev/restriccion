import mongoose from 'mongoose';
const db = 'mongodb://localhost/tengo-restriccion-dev'; // ToDo: DB-Config
mongoose.connect(db);

mongoose.connection.on('error', () => console.error(`Error connecting to: ${db}`));
mongoose.connection.once('open', () => console.log(`Connected to: ${db}`));
