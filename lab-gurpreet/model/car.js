'use strict';
const uuid = require('node-uuid');

module.exports = function car(name, model){
  this.id = uuid();
  this.name = name;
  this.model = model;
};
