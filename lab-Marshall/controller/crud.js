'use strict';

const url = require('url');
const parseBody = require('../lib/parseBody');
const parseUrl = require('../lib/parseUrl');
const User = require('../model/userConstruct');
const Router = require('../route/router');
const queryString = require('querystring');

let routes = new Router('/api');

let userObj = {};

module.exports = function CRUDControl(){
  routes.get('api/user', (req, res) => {
    //code goes here
  });

  routes.post('api/user', (req, res) => {
    //code goes here
  });
};
