'use strict';

const http = require('http');
const Router = require('./route/router');
const uuid = require('node-uuid');
const randomName = require('sillyname');

let routes = new Router('/api');
routes.id = uuid.v1();
routes.creationDate = Date.now();
routes.name = randomName();

routes.post('/testingpost', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "post-request"}');
  res.end();
});

routes.get('/simple-resource-name?id=' + routes.id, (req, res) => {
  res.writeHead(200, {
    'Content-Type':'text/plain'
  });
  res.write(routes.id, routes.name, routes.creationDate);
  res.end();
});

routes.delete('/simple-resource-name', (req, res) => {
  res.writeHead(204, {
    'Content-Type':'text/plain'
  });
  res.end();
});

module.exports = http.createServer(routes.route());
