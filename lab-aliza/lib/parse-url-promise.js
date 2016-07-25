'use strict';
const url = require('url');
const queryString = require('querystring');

const urlParser = function(req) {
  return new Promise((resolve) => {
    req.url = url.parse(req.url, true);
    req.url.query = queryString.parse(req.url.query);
    resolve();
  });
};

module.exports = urlParser;
