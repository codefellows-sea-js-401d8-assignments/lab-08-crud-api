'use strict';
const uuid = require('node-uuid');

const Resource = module.exports = function() {
  this.id = uuid.v4();
  this.creationDate = new Date();

  console.log(this.creationDate);


};
