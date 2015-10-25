(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var ENTITIES = VAGABOND.ENTITIES;

    var MovableKillableEntity = function(x, y, hp) {
      var movableKillableEntity = new ENTITIES.KillableEntity(x, y, hp);

      movableKillableEntity.move = function(dx, dy) {
        this.setX(this.getX() + dx);
        this.setY(this.getY() + dy);
      };

      return movableKillableEntity;
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
