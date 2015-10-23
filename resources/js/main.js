var hasID = function(initID) {
  var id = initID;

  return {
    getID: function() {
      return id;
    },

    setID: function(newID) {
      id = newID;
    }
  };
};

var hasName = function(initName) {
  var name = initName;

  return {
    getName: function() {
      return name;
    },

    setName: function(newName) {
      name = newName;
    }
  };
};

var hasCoor = function(initX, initY) {
  var x = initX;
  var y = initY;

  return {
    getX: function() {
      return x;
    },

    getY: function() {
      return y;
    },

    setX: function(newX) {
      x = newX;
    },

    setY: function(newY) {
      y = newY;
    }
  };
};

var hasMovableCoor = function(x, y) {
  var coor = hasCoor(x, y);

  return {
    getX: coor.getX,
    getY: coor.getY,
    setX: coor.setX,
    setY: coor.setY,
    move: function(dx, dy) {
      setX(getX + dx);
      setY(getY + dy);
    }
  };
};

var hasHealth = function(initialHealth) {
  var health = initialHealth;

  return {
    changeHealth: function(dHealth) {
      health += dHealth;
    },

    setHealth: function(newHealth) {
      health = newHealth;
    },

    getHealth: function() {
      return health;
    }
  };
};

var KillableEntity = function(x, y, hp) {
  var coorFuncs = hasCoor(x, y);
  var healthFuncs = hasHealth(hp);

  return {
    getX: coorFuncs.getX,
    getY: coorFuncs.getY,
    setX: coorFuncs.setX,
    setY: coorFuncs.setY,
    changeHealth: healthFuncs.changeHealth,
    setHealth: healthFuncs.setHealth,
    getHealth: healthFuncs.getHealth
  };
};

var MovableKillableEntity = function(x, y, hp) {
  var movableCoorFuncs = hasMovableCoor(x, y);
  var healthFuncs = hasHealth(hp);

  return {
    getX: movableCoorFuncs.getX,
    getY: movableCoorFuncs.getY,
    setX: movableCoorFuncs.setX,
    setY: movableCoorFuncs.setY,
    move: movableCoorFuncs.move,
    changeHealth: healthFuncs.changeHealth,
    setHealth: healthFuncs.setHealth,
    getHealth: healthFuncs.getHealth
  };
};

var Monster = function(id, name, x, y, hp) {
  var idFuncs = hasID(id);
  var nameFuncs = hasName(name);
  var mke = MovableKillableEntity(x, y, hp);

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

var Wall = KillableEntity;
var milo = new Monster(0, 'Milo', 2, 4, 30);
var otis = new Wall(5, 10, 50);

console.log(milo, milo.getHealth());
console.log(otis, otis.getHealth());


/*(function() {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;

  var milo = new Monster().init(2, 5, 30, 4, 6);

  console.log(milo.getCoor());
  console.log(milo.getHealth());
  console.log(milo.getDefense());
  milo.takeDamage(10);
  console.log(milo.getHealth());

  var otis = new Monster().init(0, 0, 50, 30, 10);
  console.log(otis.getCoor());
  console.log(milo.getCoor());
  console.log(milo.getHealth());
  console.log(otis);
})();
*/
