'use strict';

const http = require('http');
const handleReq = require('./lib/handleReq');
const serverPort = 3000;

let server = http.createServer(handleReq);

server.listen(serverPort, function(){
  console.log('Server is listening on http://localhost:' + serverPort + '/api/pokemon');
});
