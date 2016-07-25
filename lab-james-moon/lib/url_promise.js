'use strict';
const PromiseUrl = require('promise');
const querystring = require('querystring');

module.exports = exports = function(req) {
  return new PromiseUrl((resolve, reject) => {
    let requestString = '';
    req.on('data', (data) => {
      requestString = querystring.parse(req.url);
      console.log('here is querystring ' + requestString);
    });
    req.on('end', () => {
      if (requestString.length) {
        resolve(requestString);
      } else {
        reject(Error('uh oh error'));
      }
    });
  });
};
