'use strict';

let httpMethods = ['get', 'post', 'put', 'patch', 'delete'];

let Route = function(baseUrl) {
  this.baseUrl = baseUrl === '/' ? '' : baseUrl;
  httpMethods.map((method) => {
    this[method.toUpperCase()] = {};
  });
};

httpMethods.map((method) => {
  Route.prototype[method] = function (route, cb) {
    this[method.toUpperCase()][this.baseUrl + route] = cb;
  };
});

Route.prototype.init = function () {
  return (req, res) => {
    if (typeof this[req.method][req.url.split('?')[0]] === 'function') {
      this[req.method][req.url.split('?')[0]](req, res);
    } else {
      this.notFound404(req, res);
    }
  };
};

Route.prototype.notFound404 = function (req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('404 Not Found');
  res.end();
};

module.exports = Route;
