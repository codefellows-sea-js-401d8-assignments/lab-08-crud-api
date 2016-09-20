'use strict';

const uuid = require('node-uuid');

module.exports = exports = function(input) {
  this.name = input.name;
  this.type = input.type;
  this.evolved = input.evolved;
  this.uuid = uuid.v4();
};
