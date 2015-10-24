(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var entities = VAGABOND.ENTITIES;

    var KillableEntity = function(x, y, hp) {
      var mke = entities.MovableKillableEntity(x, y, hp);

      return {
        getX: mke.getX,
        getY: mke.getY,
        setX: mke.setX,
        setY: mke.setY,
        changeHealth: mke.changeHealth,
        setHealth: mke.setHealth,
        getHealth: mke.getHealth,
        toString: mke.toString,
        getTraits: mke.getTraits
      };
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
