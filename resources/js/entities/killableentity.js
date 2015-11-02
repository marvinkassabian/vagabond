(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = VAGABOND.ENTITIES.Entity;

    var KillableEntity = Object.create(Entity);

    var initProto = KillableEntity.init;
    var getTraitsProto = KillableEntity.getTraits;

    KillableEntity.init = function(x, y, char, hp) {
      initProto.call(this, x, y, char);

      this.hp = hp;

      return this;
    };

    KillableEntity.getTraits = function() {
      var traits = getTraitsProto.call(this);
      traits.health = this.hp;
      return traits;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
