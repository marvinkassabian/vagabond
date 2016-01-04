"use strict";

// TODO: rename to something else, maybe
// TODO: might move to controller folder, unsure

var Level = {};

Level.init = function(map) {
  // TODO: figure out a way to save space by not storing both
  // TODO: probably will need to make a population object
  // TODO: look into iterators in JavaScript
  this.entityPool = [];
  this.entityMap = {};

  this.map = map;

  return this;
};

Level.getEntitiesAt = function(coordinate) {
  var ret = [];

  for (var i = 0; i < this.entityPool.length; i++) {
    var entity = this.entityPool[i];
    if (entity.x === coordinate.x && entity.y === coordinate.y) {
      ret.push(entity);
    }
  }

  return ret;
};

Level.addEntity = function() {
  var args = arguments;
  if (args[0] instanceof Array) {
    args = args[0];
  }

  for (var i = 0; i < args.length; i++) {
    var entity = args[i];
    this.entityMap[entity.id] = entity;
  }

  Array.prototype.push.apply(this.entityPool, args);
};

// TODO: refactor to allow multiple player controlled entities
Level.setPlayer = function(entity) {
  this.player = entity;
};

Level.takeTurn = function() {
  var i;
  var entity;

  for (i = 0; i < this.entityPool.length; i++) {
    entity = this.entityPool[i];

    entity.takeTurn(this);
  }

};

Level.renderTo = function(screen) {
  var i;

  screen.clear();

  this.map.renderTo(screen);

  var sortedEntities = this.entityPool.sort(function(a, b) {
    return a.z - b.z;
  });

  for (i = 0; i < sortedEntities.length; i++) {
    sortedEntities[i].renderTo(screen);
  }
};

module.exports = Level;
