import mongoose from 'mongoose';
import {db} from '../config/db.js';
export default mongoose.connect(db);

mongoose.connection.on('error', () => console.error(`Error connecting to: ${db}`));
mongoose.connection.once('open', () => console.log(`Connected to: ${db}`));
