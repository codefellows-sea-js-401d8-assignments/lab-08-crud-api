'use strict';

const uuid = require('node-uuid');

const User = function(name) {
  this.id = uuid.v1();
  this.name = name;
  this.creationDate = Date.now();
};

module.exports = User;
