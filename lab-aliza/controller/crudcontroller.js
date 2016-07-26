'use strict';

const url = require('url');
const parseBody = require('../lib/parsebody.js');
// const parseUrl = require('../lib/parseurl.js');
const User = require('../model/userconstructor.js');
const Router = require('../route/router');
const queryString = require('querystring');
let routes = new Router('/api');

let userObj = {};

const CRUDController = function(){

//need to figure out parsing with promise...
  routes.get('/api/user', (req, res) => {
    let parsed = req.url = url.parse(req.url, true);
    parsed.query = queryString.parse(req.url.query);
    if(parsed.query.text){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(parsed.query.text.split('-').join(' '));
      res.end();
    }else{
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('bad request\n');
    }
  });

  routes.post('/api/user', (req, res) => {
    const obj = new User(req.body.name, req.body.creationDate);
    userObj[obj.id] = req.body.id;
    parseBody(req)
      .then((data) => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        userObj[data.id] = new User(data.name, data.creationDate);
        res.write(userObj);
        res.end();
      }), (err) => {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        console.log(err);
        res.write('bad request\n');
        res.end();
      };
  });
};

module.exports = CRUDController;
