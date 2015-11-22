(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.ENTITIES");

  VAGABOND.MODEL.ENTITIES = (function(module) {

    var Entity = {};

    Entity.init = function(id, x, y, char) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.z = 0;
      this.char = char;

      // TODO: redo entity 'class' structure
      this.actionCounts = {
        main: 0,
        secondary: 0,
        minor: 0
      };

      return this;
    };

    Entity.takeTurn = function() {

    };

    Entity.getInformation = function() {
      return {
        x: this.x,
        y: this.y,
        char: this.char,
      };
    };

    Entity.toString = function(replacer, space) {
      return JSON.stringify(this.getTraits(), replacer, space);
    };

    Entity.renderTo = function(screen, formatEntity) {

      formatEntity = (formatEntity !== undefined) ? formatEntity : function(entity) {
        return entity.char;
      };

      var offset = screen.getOrigin();
      var offsettedX = this.x - offset.x;
      var offsettedY = this.y - offset.y;

      if (screen.isValidCoordinate(offsettedX, offsettedY)) {
        screen.set(offsettedX, offsettedY, formatEntity.call(this, this));
      }
    };

    module.Entity = Entity;

    return module;

  })(VAGABOND.MODEL.ENTITIES);
})();
