(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var TRAITS = VAGABOND.TRAITS;
    var ENTITIES = VAGABOND.ENTITIES;

    var Monster = function(id, name, x, y, hp) {
      var idFuncs = TRAITS.hasID(id);
      var nameFuncs = TRAITS.hasName(name);
      var monster = new ENTITIES.MovableKillableEntity(x, y, hp);

      UTIL.mixin(monster, idFuncs, nameFuncs);

      var getTraits = monster.getTraits;

      monster.getTraits = function() {
        var traits = getTraits();
        traits.id = this.getID();
        traits.name = this.getName();
        return traits;
      };

      return monster;
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
