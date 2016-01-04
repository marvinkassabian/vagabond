"use strict";

var Entity = require("./entity");

var KillableEntity = Object.create(Entity);

KillableEntity.init = function(id, x, y, char, hp) {
  Entity.init.call(this, id, x, y, char);

  // TODO: make variable name not shorthand to avoid 'Hp' or 'HP' issue
  this.totalHp = hp;
  this.hp = hp;

  return this;
};

KillableEntity.getInformation = function() {
  var info = Entity.getInformation.call(this);

  info.hp = this.hp;
  info.totalHp = this.totalHp;

  return info;
};

KillableEntity.die = function() {
  this.char = "X";
  this.z = -1;
};

KillableEntity.isDead = function() {
  return this.hp <= 0;
};

module.exports = KillableEntity;
