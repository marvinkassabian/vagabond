(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var traits = VAGABOND.TRAITS;

    var KillableEntity = function(x, y, hp) {
      var coorFuncs = traits.hasCoor(x, y);
      var healthFuncs = traits.hasHealth(hp);

      var killableEntity = {};

      UTIL.mixin(killableEntity, coorFuncs, healthFuncs);

      killableEntity.toString = function(replacer, space) {
        return JSON.stringify(this.getTraits(), replacer, space);
      };

      killableEntity.getTraits = function() {
        return {
          coor: {
            x: this.getX(),
            y: this.getY()
          },
          health: this.getHealth()
        };
      };

      return killableEntity;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
