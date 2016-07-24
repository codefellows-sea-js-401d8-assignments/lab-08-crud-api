'use strict';

let routes = {};

routes.homepageGet = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('This is homepage');
  res.end();
};

module.exports = routes;
