(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var traits = VAGABOND.TRAITS;
    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = function(id, name, x, y, hp) {
      var idFuncs = traits.hasID(id);
      var nameFuncs = traits.hasName(name);
      var mke = new MovableKillableEntity(x, y, hp);

      var monster = {};

      UTIL.mixin(monster, idFuncs, nameFuncs, mke);

      monster.getTraits = function() {
        var traits = mke.getTraits();
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
