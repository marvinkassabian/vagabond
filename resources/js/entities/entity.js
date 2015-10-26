(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = {};

    Entity.init = function(x, y, char) {
      this.x = x;
      this.y = y;
      this.char = char;

      return this;
    };

    Entity.getTraits = function() {
      return {
        coor: {
          x: this.x,
          y: this.y
        },
        char: this.char
      };
    };

    Entity.toString = function(replacer, space) {
      return JSON.stringify(this.getTraits(), replacer, space);
    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.ENTITIES);
})();
