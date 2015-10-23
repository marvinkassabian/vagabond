(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var traits = VAGABOND.TRAITS;
    var MKE = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = function(id, name, x, y, hp) {
      var idFuncs = traits.hasID(id);
      var nameFuncs = traits.hasName(name);
      var mke = MKE(x, y, hp);

      return {
        getID: idFuncs.getID,
        setID: idFuncs.setID,
        getName: nameFuncs.getName,
        setName: nameFuncs.setName,
        getX: mke.getX,
        getY: mke.getY,
        setX: mke.setX,
        setY: mke.setY,
        move: mke.move,
        changeHealth: mke.changeHealth,
        setHealth: mke.setHealth,
        getHealth: mke.getHealth
      };
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
