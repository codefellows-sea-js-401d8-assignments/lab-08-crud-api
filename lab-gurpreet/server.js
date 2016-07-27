'use strict';

const http = require('http');
const Router = require('./lib/router');
const routes = require('./route/routes');

let router = new Router('/api');

routes(router);
module.exports = http.createServer(router.route()).listen(3000, () => console.log('server up'));
