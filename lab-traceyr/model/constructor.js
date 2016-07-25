const shortid = require('shortid');

module.exports = exports = function Coffee(name){
  this.name = name;
  this.id = shortid.generate();
  this.createDate = new Date();
};
