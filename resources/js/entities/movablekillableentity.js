(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var KillableEntity = VAGABOND.ENTITIES.KillableEntity;

    var MovableKillableEntity =  Object.create(KillableEntity);

    MovableKillableEntity.move = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };

    MovableKillableEntity.isValidMove = function(dx, dy, map) {
      var newX = this.x + dx;
      var newY = this.y + dy;

      return map.isValidCoordinate(newX, newY);
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
