'use strict';

const url = require('url');
const jsonPromise = require('./jsonPromise.js');
const Pokemon = require('../model/Pokemon');
const uuid = require('uuid');

let pokemonCollection = {};

module.exports = exports = function(req, res){

  if (req.method === 'POST' && req.url === '/api/pokemon') {
    jsonPromise(req)
      .then((json) => {
      //success
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        pokemonCollection[uuid.v4()] = new Pokemon(json.name, json.type);

        res.write('Finished writing new Pokemon.\r\n');
        res.end();
      }, (err) => {
      //Error
        console.log(err);
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.write('Error!');
        res.end();
      });
  }

  if (req.method === 'GET'){
    var queryData = url.parse(req.url, true).query;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    for(let key in pokemonCollection){
      if(pokemonCollection[key].pokeName == queryData.name) {
        res.write('You requested a ' + pokemonCollection[key].pokeName + ' which is type ' + pokemonCollection[key].pokeType + '.\r\n');
      }
    }
    res.end();
  }
};
