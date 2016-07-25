'use strict';
const uuid = require('node-uuid');

const Hero = module.exports = function(name, race, faction) {
  this.id = uuid.v4();
  this.name = name;
  this.race = race;
  this.faction = faction;
};
