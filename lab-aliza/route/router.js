'use strict';

let methods = ['get', 'post', 'put', 'patch', 'delete'];
let Router = function(baseUrl) {
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
    if (typeof this.routes[req.method][req.url] === 'function') {
      this.routes[req.method][req.url](req, res);
    }
    // else if () {
    //   res.writeHead(400, {
    //     'Content-Type': 'text/plain'
    //   });
    //   res.write('bad request');
    //   res.end();
    // }
    // else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('not found');
    res.end();
  };
};

module.exports = Router;
