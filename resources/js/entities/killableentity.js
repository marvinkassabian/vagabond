(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = VAGABOND.ENTITIES.Entity;

    var KillableEntity = function(x, y, hp) {
      Entity.call(this, x, y);

      this.hp = hp;
    };

    KillableEntity.prototype = Object.create(Entity.prototype);

    KillableEntity.prototype.getTraits = function() {
      var traits = Entity.prototype.getTraits.call(this);
      traits.health = this.hp;
      return traits;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
