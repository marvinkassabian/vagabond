(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var Entity = VAGABOND.ENTITIES.Entity;

    var KillableEntity = Object.create(Entity);

    KillableEntity.init = function(id, x, y, char, hp) {
      Entity.init.call(this, id, x, y, char);

      this.hp = hp;

      return this;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
