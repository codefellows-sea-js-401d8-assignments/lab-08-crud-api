'use strict';

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let json = '';
    req.on('data', (data) => {
      json =  json + data.toString();
    });
    req.on('end', () => {
      try {
        let parsedData = JSON.parse(json);
        resolve(parsedData);
      } catch(e) {
        reject(e);
      }
    });
  });
};
