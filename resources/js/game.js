(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.GAME');

  VAGABOND.GAME = (function(module) {

    var Game = {};

    Game.init = function(map, entityPool) {
      this.entityPool = (entityPool === undefined) ? [] : entityPool;
      this.map = map;

      return this;
    };

    Game.takeTurn = function() {
      var i, entity;

      for (i = 0; i < this.entityPool.length; i++) {
        entity = this.entityPool[i];
        entity.takeTurn(this);
      }
    }

    Game.renderTo = function(screen) {
      var i;
      this.map.renderTo(screen);

      for (i = 0; i < this.entityPool.length; i++) {
        this.entityPool[i].renderTo(screen);
      }
    }

    module.Game = Game;

    return module;

  })(VAGABOND.GAME);
})();
