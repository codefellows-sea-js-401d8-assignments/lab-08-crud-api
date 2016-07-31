'use strict';

const url = require('url');
const bodyParser = require('../lib/parsebody');

let methods = ['get', 'post', 'put', 'patch', 'delete'];
let Router = module.exports = exports = function(baseUrl){
  this.baseUrl = baseUrl;
  this.routes ={};
  methods.forEach((method) => {
    this.routes[method.toUpperCase()] ={};
  });
};

methods.forEach((method) => {
  Router.prototype[method] =function(route, cb){
    this.routes[method.toUpperCase()][this.baseUrl + route] =cb;
  };
});

Router.prototype.route = function(){
  return (req, res) => {
    bodyParser(req)
    .then(() => {
      req.url = url.parse(req.url, true);
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
      }else{
        res.writeHead(404, {
          'Content-Type': 'text/pain'
        });
        res.write('not found');
        res.end();
      }
    });
  };
};

Router.response = function(status, message) {
  return (res) => {
    res.writeHead(status, {
      'Content-Type': 'application/json'
    });
    if (message){
      res.write(JSON.stringify(message));
    }
    res.end();
  };
};
