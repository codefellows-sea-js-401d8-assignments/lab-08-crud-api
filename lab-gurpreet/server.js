'use strict';

const http = require('http');
const Router = require('./lib/router');

let routes = new Router('/api');

routes.get('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}');
  res.end();
});

http.createServer(routes.route()).listen(3000, () => console.log('server up'));
