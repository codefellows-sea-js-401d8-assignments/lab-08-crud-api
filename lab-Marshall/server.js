'use strict';

const http = require('http');
const CRUD = require('./controller/crud');

let server = http.createServer(
  CRUD();
);

server.listen(3000, () => console.log('  Up on 3000!!! '))
