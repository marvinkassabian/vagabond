(function() {
  "use strict";

  // TODO: rename to something else, maybe
  // TODO: might move to controller folder, unsure
  VAGABOND.namespace("VAGABOND.MODEL");

  VAGABOND.MODEL = (function(module) {

    var Level = {};

    Level.init = function(map, entityPool) {
      // TODO: decide between array or object to store entities
      this.entityPool = (entityPool === undefined) ? [] : entityPool;
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

      // HACK: just here to allow living entities to render on top of dead ones
      var sortedEntities = this.entityPool.sort(function(a, b) {
        return a.hp - b.hp;
      });

      // TODO: organize the entityPool by a z-index, in turn
      //       add z-index to entities
      for (i = 0; i < sortedEntities.length; i++) {
        sortedEntities[i].renderTo(screen);
      }
    };

    module.Level = Level;

    return module;

  })(VAGABOND.MODEL);
})();
