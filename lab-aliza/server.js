'use strict';

const http = require('http');
const crudController = require('./controller/crudcontroller.js');

let server = http.createServer(
  crudController()
);

server.listen(3000, () => {
  console.log('Server up at 3000');
});
