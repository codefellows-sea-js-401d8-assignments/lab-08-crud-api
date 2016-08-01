'use strict';

const User = require('../model/userconstructor');
const response = require('../controller/router').response;
const userPool = module.exports = exports = {};

module.exports = function(router) {

  router.get('/user', (req, res) => {
    if(req.url && req.url.query.id) {
      let user = userPool[req.url.query.id];
      if (user) return response(200, user)(res);
      if(!user) return response(404, 'not found')(res);
    }
    return response(400, 'bad request')(res);
  });

  router.post('/user', (req, res) => {
    if(req.body && req.body.name) {
      let newUser = new User(req.body.name);
      userPool[newUser.id] = newUser;
      return response(200, newUser)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.put('/user', (req, res) => {
    let user;
    if(req.url && req.url.query.id) {
      user = userPool[req.url.query.id];
    } else if (req.body && req.body.id) {
      user = userPool[req.body.id];
    }
    if(user && req.body) {
      user.name = req.body.name || user.name;
      return response(200, user)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.delete('/user', (req, res) => {
    if(req.url && req.url.query.id) {
      let user = userPool[req.url.query.id];
      if(user) {
        delete userPool[req.url.query.id];
        return response(204, null)(res);
      }
      return response(400, 'bad request')(res);
    }
  });
};
