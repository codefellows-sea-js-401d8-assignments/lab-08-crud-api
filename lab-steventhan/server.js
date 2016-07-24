'use strict';

const http = require('http');
const Router = require('thanst-router');
const routes = require('./routes');

let router = new Router('/'); // Passing in base url

router.get('/', (req, res) => {
  routes.homepageGet(req, res);
});


http.createServer(router.init()).listen(3000, () => {
  console.log('Server running at port 3000');
});
