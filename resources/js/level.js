(function() {
  "use strict";

  // TODO: rename to something else, maybe
  VAGABOND.namespace("VAGABOND.LEVEL");

  VAGABOND.LEVEL = (function(module) {

    var Level = {};

    Level.init = function(map, entityPool) {
      this.entityPool = (entityPool === undefined) ? {} : entityPool;
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

      for (var argIndex in args) {
        var entity = args[argIndex];
        this.entityPool[entity.id] = entity;
      }

      Array.prototype.push.apply(this.entityPool, args);
    };

    // TODO: clean this
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

      // TODO: organize the entityPool by a z-index, in turn
      //       add z-index to entities
      for (i = 0; i < this.entityPool.length; i++) {
        this.entityPool[i].renderTo(screen);
      }
    };

    module.Level = Level;

    return module;

  })(VAGABOND.LEVEL);
})();
