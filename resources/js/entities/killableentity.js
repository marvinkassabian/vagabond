(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = VAGABOND.ENTITIES.Entity;

    var KillableEntity = Object.create(Entity);

    var initProto = KillableEntity.init.bind(KillableEntity);
    var getTraitsProto = KillableEntity.getTraits.bind(KillableEntity);

    KillableEntity.init = function(x, y, hp) {
      initProto(x, y);

      this.hp = hp;

      return this;
    };

    KillableEntity.getTraits = function() {
      var traits = getTraitsProto();
      traits.health = this.hp;
      return traits;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
