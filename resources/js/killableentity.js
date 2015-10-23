(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var Entity = VAGABOND.ENTITIES.Entity;

    var KillableEntity = (function() {
      var hitPoints;
      var entity = new Entity();

      var KillableEntity = {};

      KillableEntity.init = function(x0, y0, hp0) {
        entity.init(x0, y0);
        this.setHealth(hp0);

        return this;
      };

      KillableEntity.setHealth = function(hp) {
        hitPoints = hp;
      };

      KillableEntity.getHealth = function() {
        return hitPoints;
      };

      KillableEntity.setCoor = entity.setCoor;
      KillableEntity.getCoor = entity.getCoor;
      KillableEntity.move = entity.move;

      return KillableEntity;
    });

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
