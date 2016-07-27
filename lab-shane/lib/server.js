'use strict';

const http = require('http');
const Constructor = require('../model/constructor.js');
const bodyParser = require('./bodyParser.js');
const urlParser = require('./urlParser.js');
const port = 3000;

var all = {
  squirtle: {
    name: 'squirtle',
    type: 'water',
    'final evolution': 'Blastoise'
  }
};

function write200(response) {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
}

function write404(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  response.write('404 File Not Found\n');
  response.end();
}

let server = module.exports = exports = http.createServer((req, res) => {
  urlParser(req)
    .then((parsed) => {
      if (req.method === 'GET' && parsed.path === '/api/pokemon/all') {
        write200(res);
        res.write('All pokemon on server: ' + JSON.stringify(Object.keys(all)) + '\n');
        res.end();
      } else if (req.method === 'GET' && parsed.path === '/api/' + parsed.search) {
        if (parsed.path !== '/api/' + parsed.search || parsed.path.length < 15) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.write('400 No id found\n');
          res.end();
        } else {
          if (all[parsed.query.pokemon]) {
            write200(res);
            let body = all[parsed.query.pokemon];
            res.write(JSON.stringify(body) + '\n');
            res.end();
          } else {
            write404(res);
          }
        }
      } else if (req.method === 'POST' && parsed.path === '/api/' + parsed.search) {
        if (all[parsed.query.pokemon]) {
          res.writeHead(405, {
            'Content-Type': 'text/plain'
          });
          res.write('Pokemon ' + parsed.query.pokemon + ' already exists on server. To make changes to this pokemon, use a PUT instead.\n');
          res.end();
        } else {
          bodyParser(req, res)
            .then((body) => {
              write200(res);
              var poke = new Constructor(body);
              all[poke.name] = poke;
              res.end();
            });
        }
      } else if (req.method === 'PUT' || req.method === 'PATCH' && parsed.path === '/api/' + parsed.search) {
        if (all[parsed.query.pokemon]) {
          bodyParser(req,res)
            .then((body) => {
              write200(res);
              all[parsed.query.pokemon] = {
                'name': body.name,
                'type': body.type,
                'final evolution': body['final evolution']
              };
              res.end();
            });
        } else {
          write404(res);
        }
      } else if (req.method === 'DELETE' && parsed.path === '/api/' + parsed.search) {
        if (all[parsed.query.pokemon]) {
          res.writeHead(204, {
            'Content-Type': 'text/plain'
          });
          res.write('Pokemon ' + parsed.query.pokemon + ' deleted!\n');
          delete all[parsed.query.pokemon];
          res.end();
        } else {
          write404(res);
        }

      } else {
        write404(res);
      }
    });
});

server.listen(port, () => {
  console.log('server is up on ' + port);
});
