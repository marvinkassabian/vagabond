(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.GAME');

  VAGABOND.GAME = (function(module) {

    var Game = {};

    Game.init = function() {
      this.entityPool = [];

      return this;
    };

    module.Game = Game;

    return module;

  })(VAGABOND.GAME);
})();
