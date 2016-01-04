"use strict";

var KillableEntity = require("./killableentity");

var MovableKillableEntity =  Object.create(KillableEntity);

MovableKillableEntity.init = function(id, x, y, char, hp) {
  KillableEntity.init.call(this, id, x, y, char, hp);

  this.movement = 16;

  return this;
};

MovableKillableEntity.move = function(dx, dy) {
  this.x += dx;
  this.y += dy;

  // HACK: just so that the player can in theory kill everything
  // TODO: remove after healing is implemented
  this.hp = Math.min(this.hp + 1, this.totalHp);
};

MovableKillableEntity.isValidMove = function(dx, dy, level) {
  var map = level.map;
  var newX = this.x + dx;
  var newY = this.y + dy;

  // TODO: clean this
  var isOccupied = false;
  var i;
  for (i = 0; i < level.entityPool.length; i++) {
    var entity = level.entityPool[i];
    // TODO: do something more elegant about allowing entities to walk
    //       over dead bodies.
    if (entity.x === newX && entity.y === newY && entity.hp > 0) {
      isOccupied = true;
    }
  }

  return map.isValidCoordinate(newX, newY) && map.graph.getEdgeValue(this, {
    x: newX,
    y: newY
  }) < this.movement && !isOccupied;
};

module.exports = MovableKillableEntity;
