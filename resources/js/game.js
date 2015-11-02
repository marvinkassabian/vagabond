(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.GAME');

  VAGABOND.GAME = (function(module) {

    var Game = {};

    Game.init = function(map) {
      this.entityPool = [];
      this.map = map;

      return this;
    };

    Game.takeTurn = function() {
      var i, entity;

      for (i = 0; i < entityPool.length; i++) {
        entity = entityPool[i];

      }
    }

    module.Game = Game;

    return module;

  })(VAGABOND.GAME);
})();
