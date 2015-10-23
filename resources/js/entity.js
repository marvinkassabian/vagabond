(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = (function() {
      var x;
      var y;

      var Entity = {};

      Entity.init = function(x0, y0) {
        this.setCoor(x0, y0);

        return this;
      };

      Entity.setCoor = function(x0, y0) {
        x = x0;
        y = y0;

        return this;
      };

      Entity.getCoor = function() {
        return {
          x: x,
          y: y
        };
      };

      Entity.move = function(dx, dy) {
        x += dx;
        y += dy;

        return this;
      };

      return Entity;
    });

    module.Entity = Entity;

    return module;
  })(VAGABOND.ENTITIES);
})();
