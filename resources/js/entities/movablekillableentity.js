(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var KillableEntity = VAGABOND.ENTITIES.KillableEntity;

    var MovableKillableEntity = function(x, y, hp) {
      KillableEntity.call(this, x, y, hp);
    };

    MovableKillableEntity.prototype = Object.create(KillableEntity.prototype);

    MovableKillableEntity.prototype.move = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
