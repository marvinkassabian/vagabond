"use strict";

var Monster = require("./monster");

var PlayerEntity = Object.create(Monster);

PlayerEntity.die = function() {
  Monster.die.call(this);

  this.move = function() {};

  this.attack = function() {};

  this.takeTurn = function() {};
};

module.exports = PlayerEntity;
