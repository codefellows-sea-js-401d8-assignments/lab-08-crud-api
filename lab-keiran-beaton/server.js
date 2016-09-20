'use strict';

const http = require('http');
const Constructor = require('./model/constructor');
const bodyParser = require('./lib/body-parser');
const urlParser = require('./lib/url-parser');
const serverPort = 3000;

let all = {
  charmander: {
    name: 'charmander',
    type: 'fire',
    evolved: 'charmeleon'
  }
};

function write200(response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
}

function write404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('404, file not found\n');
  response.end();
}

let server = module.exports = exports = http.createServer((request, response) => {
  urlParser(request).then((parsed) => {
    if (request.method === 'GET' && parsed.path === '/api/pokemon/all') {
      write200(response);
      response.write('All pokemon on server: ' + JSON.stringify(Object.keys(all)) + '\n');
      response.end();
    } else if (request.method === 'GET' && parsed.path === '/api/' + parsed.search) {
      if (parsed.path !== '/api/' + parsed.search || parsed.path.length < 15) {
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write('400, bad request\n');
        response.end();
      } else {
        if(all[parsed.query.pokemon]) {
          write200(response);
          let body = all[parsed.query.pokemon];
          response.write(JSON.stringify(body) + '\n');
          response.end();
        } else {
          write404(response);
        }
      }
    } else if (request.method === 'POST' && parsed.path === '/api/' + parsed.search) {
      if(all[parsed.query.pokemon]) {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.write('Pokemon ' + parsed.query.pokemon + ' alreadey exists. To make changes, use a put instead.\n');
        response.end();
      } else {
        bodyParser(request, response).then((body) => {
          write200(response);
          var poke = new Constructor(body);
          all[poke.name] = poke;
          response.end();
        });
      }
    } else if (request.method === 'PUT' || request.method === 'PATCH' && parsed.path === '/api/' + parsed.search) {
      if (all[parsed.query.pokemon]) {
        bodyParser(request, response).then((body) => {
          write200(response);
          all[parsed.query.pokemon] = {name:body.name, type:body.type, evolved:body.evolved};
          response.end();
        });
      } else {
        write404(response);
      }
    } else if (request.method === 'DELETE' && parsed.path === '/api/' + parsed.search) {
      if (all[parsed.query.pokemon]) {
        response.writeHead(204, {'Content-Type': 'text/plain'});
        response.write('Pokemon ' + parsed.query.pokemon + ' deleted\n');
        response.end();
      } else {
        write404(response);
      }
    } else {
      write404(response);
    }
  });
});

server.listen(serverPort, () => {
  console.log('server up on port ' + serverPort);
});
