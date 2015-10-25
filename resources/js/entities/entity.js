(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var TRAITS = VAGABOND.TRAITS;

    var Entity = function(x, y) {
      var entity = TRAITS.hasCoor(x, y);

      entity.toString = function(replacer, space) {
        return JSON.stringify(this.getTraits(), replacer, space);
      };

      entity.getTraits = function() {
        return {
          coor: {
            x: entity.getX(),
            y: entity.getY()
          }
        };
      };

      return entity;

    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.ENTITIES);
})();
