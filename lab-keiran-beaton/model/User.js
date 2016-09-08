'use strict';

const uuid = require('node-uuid');

module.exports = exports = function User(input) {
  this.name = input.name;
  this.age = input.age;
  this.uuid = uuid.v4();
};
