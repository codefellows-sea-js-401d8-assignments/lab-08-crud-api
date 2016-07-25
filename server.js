'use strict';

const http = require('http');
const Router = require('vien-simple-router');
const routes = require('./route/routes');

let router = new Router('/api');
routes(router); // instantiates the routes, all routes defined in route/routes.js

http.createServer(router.route()).listen(3000, () => console.log('server up'));
