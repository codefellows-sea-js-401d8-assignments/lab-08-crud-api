'use strict';

const http = require('http');
const Router = require('./controller/router');
const crudRoutes = require('./route/crudroutes');
let router = new Router('/api');
let port = 3000;

crudRoutes(router);
module.exports = http.createServer(router.route()).listen(port, () => console.log('server up at ' + port));
