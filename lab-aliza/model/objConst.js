const uuid = require('node-uuid');
const randomName = require('sillyname');

function ObjWithInfo() {
  this.id = uuid.v1();
  this.name = randomName();
  this.creationDate = Date.now();
}

module.exports = ObjWithInfo;
