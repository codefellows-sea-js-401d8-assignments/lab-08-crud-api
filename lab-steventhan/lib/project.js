'use strict';

const uuid = require('node-uuid');

let Project = function(projectName, technology, github) {
  this.id = uuid.v1();
  this.projectName = projectName;
  this.technology = technology;
  this.github = github;

};

module.exports = Project;
