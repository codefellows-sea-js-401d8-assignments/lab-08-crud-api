'use strict';

const http = require('http');
const Router = require('./route/router');
const url = require('url');

let routes = new Router('/api');

routes.get();

module.exports = exports = http.createServer(routes.route()).listen(3000, () => console.log('Server On'));
