'use strict';

const url = require('url');

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let parsedUrl = url.parse(req.url, true);
    try {
      resolve(parsedUrl);
    } catch (err) {
      reject(err);
    }
  });
};
