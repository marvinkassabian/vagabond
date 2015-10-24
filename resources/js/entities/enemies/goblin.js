(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var traits = VAGABOND.TRAITS;
    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = function(x, y, hp) {
      var monster = new Monster(UTIL.generateUUID(), 'Goblin', x, y, hp);

      return monster;
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
