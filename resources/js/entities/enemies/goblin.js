(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var TRAITS = VAGABOND.TRAITS;
    var ENTITIES = VAGABOND.ENTITIES;

    var Goblin = function(x, y, hp) {
      var goblin = new ENTITIES.Monster(UTIL.generateUUID(), 'Goblin', x, y, hp);

      goblin.attack = function() {

      };

      return goblin;
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
