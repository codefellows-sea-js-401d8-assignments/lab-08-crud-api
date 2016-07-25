'use strict';
const http = require('http');
const Router = require('./route/router');
const promise = require('./lib/promise');
const urlPromise = require('./lib/url_promise');
const WowHero = require('./model/hero');

let router = new Router('/api');

router.get('/get', (req, res) => {
  promise(req).then((data) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(data));
    res.end();
  }, (err) => {
    console.log(err);
    res.end();
  });
});

router.post('/post', (req, res) => {
  urlPromise(req).then((data) => {
    let hero = new WowHero(data);
    res.writeHead(200, {'Content-type': 'application/json'});
    res.write(JSON.stringify(data));
    console.log(hero);
    res.end();

  });
});

let server = http.createServer(router.route());
server.listen(3000, console.log('server is up'));
