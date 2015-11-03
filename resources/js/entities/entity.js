(function() {
  "use strict";

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

    Entity.takeTurn = function() {

    };

    Entity.toString = function(replacer, space) {
      return JSON.stringify(this.getTraits(), replacer, space);
    };

    Entity.renderTo = function(screen) {
      var offset = {
        x: screen.originX - Math.floor(screen.width / 2),
        y: screen.originY - Math.floor(screen.height / 2)
      };

      if (screen.isValidCoordinate(this.x + offset.x, this.y + offset.y)) {
        // only clamped for testing / to avoid errors
        screen.clampedSet(this.x + offset.x, this.y + offset.y, this.char);
      }
    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.ENTITIES);
})();
