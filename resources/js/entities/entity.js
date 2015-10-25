(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = function(x, y) {
      this.x = x;
      this.y = y;
    };

    Entity.prototype.toString = function(replacer, space) {
      return JSON.stringify(this.getTraits(), replacer, space);
    };

    Entity.prototype.getTraits = function() {
      return {
        coor: {
          x: this.x,
          y: this.y
        }
      };
    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.ENTITIES);
})();
