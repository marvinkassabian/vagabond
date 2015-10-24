(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var traits = VAGABOND.TRAITS;

    var MovableKillableEntity = function(x, y, hp) {
      var coorFuncs = traits.hasCoor(x, y);
      var healthFuncs = traits.hasHealth(hp);

      var mke = {};

      UTIL.mixin(mke, coorFuncs, healthFuncs);

      mke.toString = function(replacer, space) {
        return JSON.stringify(this.getTraits(), replacer, space);
      };

      mke.getTraits = function() {
        return {
          coor: {
            x: this.getX(),
            y: this.getY()
          },
          health: this.getHealth()
        };
      };

      return mke;
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
