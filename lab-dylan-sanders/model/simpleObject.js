'use strict';

const uuid = require('node-uuid');

let SimpleObject = function(name) {
  this.id = uuid.v1();
  this.name = name;
  this.creationDate = new Date();
};

module.exports = SimpleObject;
