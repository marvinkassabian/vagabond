(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var KillableEntity = VAGABOND.ENTITIES.KillableEntity;

    var MovableKillableEntity =  Object.create(KillableEntity);

    MovableKillableEntity.move = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
