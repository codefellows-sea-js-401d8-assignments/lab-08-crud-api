'use strict';

module.exports = exports = function(req){
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      req.body = '';
      req.on('data', (data) => {
        req.body += data;
      });
      req.on('data', () => {
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
