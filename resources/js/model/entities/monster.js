"use strict";

var UTIL = require("../../util/util");
var MovableKillableEntity = require("./movablekillableentity");
var logger = require("../../util/logger");

var Monster = Object.create(MovableKillableEntity);

Monster.init = function(x, y, char, hp, name, type, strength) {
  MovableKillableEntity.init.call(this, UTIL.generateUUID(), x, y, char, hp);

  this.name = name;
  this.type = type;
  this.strength = strength;

  return this;
};

// TODO: move to a 'NamedEntity' object
Monster.getFullName = function() {
  return this.name + ", the " + this.type;
};

Monster.getInformation = function() {
  var info = MovableKillableEntity.getInformation.call(this);

  info.name = this.name;
  info.type = this.type;
  info.fullName = this.getFullName();
  info.strength = this.strength;

  return info;
};

// TODO: clean this
Monster.attack = function(killableEntity) {
  logger.log(logger.toSentenceElement(this, "attacked", killableEntity));
  killableEntity.hp = Math.max(killableEntity.hp - this.strength, 0);
  if (killableEntity.isDead()) {
    logger.log(logger.toSentenceElement(this, "killed", killableEntity));
    killableEntity.die();
  }
};

module.exports = Monster;
