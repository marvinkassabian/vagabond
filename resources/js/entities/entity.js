(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = {};

    Entity.init = function(x, y) {
      this.x = x;
      this.y = y;

      return this;
    };

    Entity.getTraits = function() {
      return {
        coor: {
          x: this.x,
          y: this.y
        }
      };
    };

    Entity.toString = function(replacer, space) {
      return JSON.stringify(this.getTraits(), replacer, space);
    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.ENTITIES);
})();
