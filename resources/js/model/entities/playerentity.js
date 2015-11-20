(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.ENTITIES");

  VAGABOND.MODEL.ENTITIES = (function(module) {

    var Monster = VAGABOND.MODEL.ENTITIES.Monster;

    var PlayerEntity = Object.create(Monster);

    module.PlayerEntity = PlayerEntity;

    return module;
  })(VAGABOND.MODEL.ENTITIES);
})();
