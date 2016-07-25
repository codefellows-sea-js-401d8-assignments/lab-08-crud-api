'use strict';

const http = require('http');
const Router = require('./route/router');
const ObjConst = require('./model/objConst');
let routes = new Router('/api');
let infoObject = {};

routes.post('/simple-resource-name', (req, res) => {
  const obj = new ObjConst(req.body.name, req.body.creationDate);
  infoObject[obj.id] = req.body.id;
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(obj);
  res.end();
});

routes.get('/simple-resource-name', (req, res) => {
  res.writeHead(200, {
    'Content-Type':'text/plain'
  });
  res.write('test');
  res.end();
});

routes.delete('/simple-resource-name', (req, res) => {
  res.writeHead(204, {
    'Content-Type':'text/plain'
  });
  res.end();
});

module.exports = http.createServer(routes.route());
