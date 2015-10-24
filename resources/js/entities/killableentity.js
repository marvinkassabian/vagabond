(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var entities = VAGABOND.ENTITIES;

    var KillableEntity = function(x, y, hp) {
      var mke = entities.MovableKillableEntity(x, y, hp);
      delete mke.move;

      return mke;
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
