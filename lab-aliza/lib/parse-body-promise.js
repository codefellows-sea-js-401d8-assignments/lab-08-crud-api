'use strict';

const bodyParser = function(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET' || req.method === 'POST' || req.method === 'DELETE') {
      let jsonString = '';
      req.on('data', (data) => {
        jsonString = jsonString + data.toString();
      });

      req.on('end', () => {
        try {
          let parsed = JSON.parse(jsonString);
          resolve(parsed);
        } catch(e) {
          reject(e);
        }
      });
    }
    resolve();
  });
};

module.exports = bodyParser;
