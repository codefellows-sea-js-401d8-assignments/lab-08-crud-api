'use strict';

let methods = ['get', 'post', 'put', 'patch', 'delete'];

let Router = module.exports = exports = function(baseUrl) {
  this.baseUrl = baseUrl;
  this.routes = {};
  methods.forEach((method) => {
    this.routes[method.toUpperCase()] = {};
  });

  console.log(this.routes);
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
    } else {
      res.writeHead(404, {
        'Content-type': 'text/plain'
      });
      res.write('404 error: that page does not exist');
      res.end();
    }
  };
};
