'use strict';

// const http = require('http');

module.exports = function(req){
  return new Promise(function(resolve, reject){
    if (req.method === 'POST') {
      req.body = '';
      req.on('data', function (data){
        req.body += data;
      });
      req.on('data', function(){
        try{
          req.body = JSON.parse(req.body);
          resolve();
        } catch (err){
          reject(err);
        }
      });
    }
    resolve();
  });
};
