# thanst-router:
Lightweight routing module for NodeJS web application

## A minimal application:
```javascript
'use strict';

const http = require('http');
const Router = require('thanst-router');

let routes = new Router('/'); // Passing in base url

routes.get('/', (req, res) => {
  homepageGet(req, res);
});

function homepageGet(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('This is homepage');
  res.end();
}

http.createServer(routes.init()).listen(3000, () => {
  console.log('Server running at port 3000');
});
```
