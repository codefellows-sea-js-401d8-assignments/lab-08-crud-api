'use strict';

const http = require('http');
const uuid = require('node-uuid');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer((req, res) => {
  console.log('connected');
  
});

server.listen(3000, () => {
  console.log('server is up on 3000');
});
