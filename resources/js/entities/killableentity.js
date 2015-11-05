(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var Entity = VAGABOND.ENTITIES.Entity;

    var KillableEntity = Object.create(Entity);

    KillableEntity.init = function(x, y, char, hp) {
      Entity.init.call(this, x, y, char);

      this.hp = hp;

      return this;
    };

    KillableEntity.getTraits = function() {
      var traits = Entity.getTraits.call(this);
      traits.health = this.hp;
      return traits;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
