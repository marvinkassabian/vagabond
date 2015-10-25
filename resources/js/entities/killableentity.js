(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var TRAITS = VAGABOND.TRAITS;
    var ENTITIES = VAGABOND.ENTITIES;

    var KillableEntity = function(x, y, hp) {
      var healthFuncs = TRAITS.hasHealth(hp);

      var killableEntity = new ENTITIES.Entity(x, y);

      UTIL.mixin(killableEntity, healthFuncs);

      var getTraits = killableEntity.getTraits;

      killableEntity.getTraits = function() {
        var traits = getTraits();
        traits.health = killableEntity.getHealth();
        return traits;
      };

      return killableEntity;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
