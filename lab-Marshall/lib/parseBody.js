'use strict';

module.exports = function bodyParser(req, res){
  return new Promise((resolve, reject) => {
    if (req.method === 'GET' || req.method === 'POST' || req.method === 'DELETE'){
      let jsonString = '';
      req.on('data', (data) => {
        jsonString = jsonString + data.toString();
      });

      req.on('end', () => {
        try {
          if (jsonString === ''){
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            });
            res.write('400 Bad request! No body found!');
            res.end();
          }
          let parsed = JSON.parse(jsonString);
          resolve(parsed);
        } catch(e) {
          reject(e);
        }
      });
    }
  });
};
