'use strict';

const uuid = require('node-uuid');

module.exports = exports = function User(name, age) {
  this.name = name;
  this.age = age;
  this.uuid = uuid.v4();
};
