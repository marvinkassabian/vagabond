(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var traits = VAGABOND.TRAITS;

    var MovableKillableEntity = function(x, y, hp) {
      var coorFuncs = traits.hasCoor(x, y);
      var healthFuncs = traits.hasHealth(hp);

      return {
        getX: coorFuncs.getX,
        getY: coorFuncs.getY,
        setX: coorFuncs.setX,
        setY: coorFuncs.setY,
        move: coorFuncs.move,
        changeHealth: healthFuncs.changeHealth,
        setHealth: healthFuncs.setHealth,
        getHealth: healthFuncs.getHealth
      };
    };

    module.MovableKillableEntity = MovableKillableEntity;

    return module;
  })(VAGABOND.ENTITIES);
})();
