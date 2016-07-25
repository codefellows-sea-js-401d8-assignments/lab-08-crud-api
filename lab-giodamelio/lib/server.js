const http = require('http');

const SimpleRouter = require('simple-router');

const Pokemon = require('./model/pokemon');

const POKEMON = {};

const router = new SimpleRouter({
  rootPath: '/api',
});

router.post('/pokemon', SimpleRouter.jsonParser(), (req, res) => {
  const pokemon = new Pokemon(req.body.name, req.body.number, req.body.height);
  POKEMON[pokemon.id] = pokemon;
  res.json(pokemon);
});

module.exports = http.createServer(router.route());
