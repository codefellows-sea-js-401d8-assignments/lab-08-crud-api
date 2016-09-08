'use strict';

const url = require('url');
const jsonPromise = require('./jsonPromise');
const User = require('../model/User');
const uuid = require('uuid');

let userPool = {};


module.exports = exports = function(req, res) {
  if(req.method === 'POST' && req.url === '/api/user'){
    jsonPromise(req)
    .then((data) => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      userPool[uuid.v4()] = new User(data.name, data.age);
      console.log(userPool);
      res.write('Done writing new user. \r\n');
      res.end();
    }, (err) => {
      console.log('error', err);
      res.writeHead(400, {
        'Content-Type': 'application/json'
      });
      res.write('error');
      res.end();
    });
  }

  if(req.method === 'GET'){
    var data = url.parse(req.url, true).query;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    for(let key in userPool){
      if(userPool[key].name === data.name){
        res.write('user.name: ' + userPool[key].name + ', user.age: ' + userPool[key].age + '.\r\n');
      }
    }
    res.end();
  }
};
