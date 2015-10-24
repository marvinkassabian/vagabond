(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var traits = VAGABOND.TRAITS;
    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = function(x, y, hp) {
      var monster = new Monster(UTIL.generateUUID(), 'Goblin', x, y, hp);

      return {
        getID: monster.getID,
        setID: monster.setID,
        getName: monster.getName,
        setName: monster.setName,
        getX: monster.getX,
        getY: monster.getY,
        setX: monster.setX,
        setY: monster.setY,
        move: monster.move,
        changeHealth: monster.changeHealth,
        setHealth: monster.setHealth,
        getHealth: monster.getHealth,
        toString: monster.toString,
        getTraits: monster.getTraits
      };
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
