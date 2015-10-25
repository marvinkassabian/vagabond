(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = Object.create(Monster);

    var initProto = Goblin.init.bind(Goblin);
    var getTraitsProto = Goblin.getTraits.bind(Goblin);

    Goblin.init = function(x, y, hp) {
      return initProto(UTIL.generateUUID(), 'Goblin', x, y, hp);
    };

    Goblin.attack = function() {
      console.log(this.name, 'attacks!');
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
