'use strict';
const Promise = require('promise');

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      if (body.length) {
        resolve(JSON.parse(body));
      } else {
        reject(Error('uh oh error'));
      }
    });
  });
};
