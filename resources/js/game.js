(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.GAME');

  VAGABOND.GAME = (function(module) {

    var Map = VAGABOND.MAP.Map;

    var Game = {};

    Game.init = function() {
      this.entityPool = [];
      this.map = Object.create(Map).init();

      return this;
    };

    module.Game = Game;

    return module;

  })(VAGABOND.GAME);
})();
