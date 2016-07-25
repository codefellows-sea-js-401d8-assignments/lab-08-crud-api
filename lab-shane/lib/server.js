'use strict';

const http = require('http');
const uuid = require('node-uuid');
const url = require('url');
const querystring = require('querystring');
const Constructor = require('../model/constructor.js');
const bodyParser = require('./bodyParser.js');

var all = {};

let server = http.createServer((req, res) => {
  // console.log('connected');
  let parsed = url.parse(req.url, true);
  // console.log(parsed);
  if(req.method === 'GET' && parsed.path === '/' ){
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write('Hello!\nNow try a GET request to "/api/".\n');
    res.end();
  } else if (req.method === 'GET' && parsed.path === '/api/' + parsed.search){
    console.log('this is parsed: ',  parsed);

    // console.log(parsed.query);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    let body = all;
    res.write(JSON.stringify(body) + '\n');
    res.end();

  } else if(req.method === 'POST' && parsed.path === '/api/' + parsed.search){
    console.log('this is parsed: ',  parsed);
    bodyParser(req)
    .then((body) => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      var poke = new Constructor(body);
      all[poke.name] = poke;
      res.write('Pokemon ' + poke.name + ' inputted: ' + JSON.stringify(all[poke.name]) + '\n');
      console.log(all);

      res.end();
    });
  }
});

server.listen(3000, () => {
  console.log('server is up on 3000');
});
