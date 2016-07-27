'use strict';

const uuid = require('node-uuid');

module.exports = function codeFellowsStudents(name, gender, age){
  this.id = uuid.v1();
  this.name = name;
  this.gender = gender;
  this.age = age;
};
