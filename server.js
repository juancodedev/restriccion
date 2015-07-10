const path = require('path');
const route = require('koa-route');
const koa = require('koa');
const hbs = require('koa-hbs');

const app = koa();

app.use(hbs.middleware({
  viewPath: path.join(__dirname, 'app', 'views')
}));

app.use(function *() {
  yield this.render('main', {
    title  : 'koa-hbs',
    content: 'Hola!'
  });
});

/*
const db = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' }
};

const pets = {
  list: function *(){
    const names = Object.keys(db);
    this.body = 'pets: ' + names.join(', ');
  },

  show: function *(name){
    const pet = db[name];
    if (!pet) { return this.throw('cannot find that pet', 404); }
    this.body = pet.name + ' is a ' + pet.species;
  }
};

app.use(route.get('/pets', pets.list));
app.use(route.get('/pets/:name', pets.show));

*/

app.listen(3000);
console.log('listening on port 3000');
