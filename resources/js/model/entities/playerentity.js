(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;

    var PlayerEntity = Object.create(Monster);

    module.PlayerEntity = PlayerEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
