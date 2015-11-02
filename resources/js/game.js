(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.GAME');

  VAGABOND.GAME = (function(module) {

    var Game = {};

    Game.init = function(map, staticEntityPool, entityPool) {
      this.staticEntityPool = (staticEntityPool === undefined) ? [] : staticEntityPool;
      this.entityPool = (entityPool === undefined) ? [] : entityPool;
      this.map = map;

      return this;
    };

    Game.takeTurn = function() {
      var i, entity;

      for (i = 0; i < this.entityPool.length; i++) {
        entity = this.entityPool[i];
        entity.takeTurn();
      }
    }

    var formatValue = function(value) {
      return Math.floor(Math.max(Math.min(value, 9), 0)).toString(16);
    };

    Game.renderTo = function(screen) {
      var i, entity, staticEntity;
      this.map.renderTo(screen, formatValue);

      for (i = 0; i < this.staticEntityPool.length; i++) {
        staticEntity = this.staticEntityPool[i];
        entity.renderTo(screen);
      }

      for (i = 0; i < this.entityPool.length; i++) {
        entity = this.entityPool[i];
        entity.renderTo(screen);
      }
    }

    module.Game = Game;

    return module;

  })(VAGABOND.GAME);
})();
