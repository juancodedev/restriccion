import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  _id    : String,
  fecha  : Date,
  estatus: String,
  numeros: {
    sinSello: Array,
    conSello: Array
  }
});

const RestrictionDay = mongoose.model('RestrictionDay', Schema);

export function set(obj) {
  const document = new RestrictionDay(obj);
  const query = {'_id': obj._id};

  RestrictionDay.findOneAndUpdate(query, document, {upsert: true}, function(err, doc){
    if (err) { return console.error(err); }
    console.log('Saved! : ', doc || document);
  });
}

export function create(obj) {
  const document = new RestrictionDay(obj);

  document.save(function (err, doc) {
    if (err) { return console.error(err); }
    console.log('Saved! : ', doc);
  });
}
