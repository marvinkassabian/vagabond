(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = function(x, y, hp) {
      Monster.call(this, UTIL.generateUUID(), 'Goblin', x, y, hp);
    };

    Goblin.prototype = Object.create(Monster.prototype);

    Goblin.prototype.attack = function() {

    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
