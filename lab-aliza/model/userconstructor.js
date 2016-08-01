'use strict';

const uuid = require('node-uuid');

const User = function(name) {
  let date = new Date();
  this.id = uuid.v1();
  this.name = name;
  this.creationTime = date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
};

module.exports = User;
