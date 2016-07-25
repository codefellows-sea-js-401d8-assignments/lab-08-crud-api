const http = require('http');

const SimpleRouter = require('simple-router');

const router = new SimpleRouter();

router.get('/', function(req, res) {
  res.end('HAHA');
});

module.exports = http.createServer(router.route());

