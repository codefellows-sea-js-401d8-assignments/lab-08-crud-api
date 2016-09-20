'use strict';

module.exports = exports = function(request, response) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (data) => {
      body += data;
    });

    request.on('end', () => {
      try {
        if (body === '') {
          response.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          response.write('400, no body found\n');
          response.end();
        }
        let parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
  });
};
