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

    Entity.renderTo = function(screen, formatEntity) {

      formatEntity = (formatEntity !== undefined) ? formatEntity : function(entity) {
        return entity.char;
      };

      var offset = screen.getOffset();
      var offsettedX = this.x - offset.x;
      var offsettedY = this.y - offset.y;


      if (screen.isValidCoordinate(offsettedX, offsettedY)) {
        screen.set(offsettedX, offsettedY, formatEntity.call(this, this));
      }
    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.ENTITIES);
})();
