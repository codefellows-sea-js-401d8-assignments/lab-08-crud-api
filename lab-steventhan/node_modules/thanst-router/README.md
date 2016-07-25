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

## Handling url's query string. For e.g http://example.com/articles?id=11111:
```javascript
'use strict';

const url = require('url');

router.get('/articles', (req, res) => {
  let id = url.parse(req.url, true).query.id;
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('This article\'s id is', id);
});
```

## Custom 404 handling:
```javascript
// Simply rewrite the notFound404 class method
router.notFound404 = (req, res) => {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('Custom 404');
  res.end();
};
```
