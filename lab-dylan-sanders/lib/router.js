'use strict';
const parseUrl = require('./urlParser');
const parseJson = require('./json_promise');

let methods = ['get', 'post', 'put', 'delete'];
let Router = module.exports = exports = function(baseUrl) {
  this.baseUrl = baseUrl;
  this.routes = {};
  methods.forEach((method) => {
    this.routes[method.toUpperCase()] = {};
  });
};

methods.forEach((method) => {
  Router.prototype[method] = function(route, cb) {
    this.routes[method.toUpperCase()][this.baseUrl + route] = cb;
  };
});

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([Router.parseUrl(req), Router.parseJson(req)])
    .then(() => {
      if (typeof this.routes[req.method][req.url.query] === 'function') {
        return this.routes[req.method][req.url.query](req, res);
      } else {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('nonexisting page');
        res.end();
      }
    });
  };
};
