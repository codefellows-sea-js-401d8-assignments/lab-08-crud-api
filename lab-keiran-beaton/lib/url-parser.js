'use strict';

const url = require('url');

module.exports = exports = function(request) {
  return new Promise((resolve, reject) => {
    let parsed = url.parse(request.url, true);
    try {
      resolve(parsed);
    } catch (error) {
      reject(error);
    }
  });
};
