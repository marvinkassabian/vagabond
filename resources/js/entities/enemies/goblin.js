(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var traits = VAGABOND.TRAITS;
    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = function(x, y, hp) {
      var goblin = new Monster(UTIL.generateUUID(), 'Goblin', x, y, hp);

      goblin.attack = function() {

      };

      return goblin;
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
