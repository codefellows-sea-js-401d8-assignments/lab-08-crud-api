'use strict';

module.exports = exports = function Resource(input){
  this.name = input.name;
  this.type = input.type;
  this['final evolution'] = input['final evolution'];
};
