'use strict';

const http = require('http');
const User = require('./model/User');
const jsonPromise = require('./lib/jsonPromise');
const urlParser = require('./lib/urlParser');
const serverPort = 3000;

let userPool = {
  keiran: {
    name: 'keiran',
    age: '24'
  }
};

function write404(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  response.write('404 file not found\n');
  response.end();
}

function write200(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
}

let server = module.exports = exports = http.createServer((req, res) => {
  urlParser(req)
    .then((parsed) => {
      if (req.method === 'GET' && parsed.path === '/api/user/all') {
        write200(res);
        res.write('All users: ' + JSON.stringify(Object.keys(userPool)) + '\n');
        res.end();
      }
      if(req.method === 'GET' && parsed.path === '/api/' + parsed.search) {
        if (parsed.path !== '/api/' + parsed.search) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.write('400 bad request\n');
          res.end();
        } else {
          if (userPool[parsed.query.user]) {
            write200(res);
            let body = userPool[parsed.query.user];
            res.write(JSON.stringify(body) + '\n');
            res.end();
          } else {
            write404(res);
          }
        }
      }
      if (req.method === 'POST' && parsed.path === '/api/' + parsed.search) {
        if (userPool[parsed.query.user]) {
          res.writeHead(405, {
            'Content-Type': 'text/plain'
          });
          res.write('User ' + parsed.query.user + 'already exists');
          res.end();
        } else {
          jsonPromise(req, res)
            .then((body) => {
              write200(res);
              var newUser = new User(body.name, body.age);
              userPool[newUser.name] = newUser;
              res.end();
            });
        }
      }
    });
});

server.listen(serverPort, () => {
  console.log('server is up on ' + serverPort);
});
