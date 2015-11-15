(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var KillableEntity = VAGABOND.ENTITIES.KillableEntity;

    var MovableKillableEntity =  Object.create(KillableEntity);

    MovableKillableEntity.init = function(id, x, y, char, hp) {
      KillableEntity.init.call(this, id, x, y, char, hp);

      this.movement = 6;

      return this;
    };

    MovableKillableEntity.move = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };

    MovableKillableEntity.isValidMove = function(dx, dy, level) {
      var map = level.map;
      var newX = this.x + dx;
      var newY = this.y + dy;

      // TODO: clean this
      var isOccupied = false;
      var i;
      for (i = 0; i < level.entityPool.length; i++) {
        var entity = level.entityPool[i];
        if (entity.x === newX && entity.y === newY) {
          isOccupied = true;
        }
      }

      // TODO: decouple the '1'
      return map.isValidCoordinate(newX, newY) && map.get(newX, newY) === 1 && !isOccupied;
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
