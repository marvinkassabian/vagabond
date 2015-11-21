(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.ENTITIES");

  VAGABOND.MODEL.ENTITIES = (function(module) {

    var Monster = VAGABOND.MODEL.ENTITIES.Monster;

    var PlayerEntity = Object.create(Monster);

    PlayerEntity.die = function() {
      Monster.die.call(this);

      this.move = function() {};

      this.attack = function() {};

      this.takeTurn = function() {};
    };

    module.PlayerEntity = PlayerEntity;

    return module;
  })(VAGABOND.MODEL.ENTITIES);
})();
