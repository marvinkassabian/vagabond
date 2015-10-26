(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = Object.create(Monster);

    var initProto = Goblin.init;

    Goblin.init = function(x, y, hp) {
      return initProto.call(this, UTIL.generateUUID(), 'Goblin', x, y, 'G', hp);
    };

    Goblin.attack = function() {
      console.log(this.name, 'attacks!');
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
