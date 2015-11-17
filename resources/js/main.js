(function(global) { // jshint ignore:line
  "use strict";

  var PlayerEntity = VAGABOND.ENTITIES.PlayerEntity;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var MAP_FACTORY = VAGABOND.MAPS.FACTORY;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Listener = VAGABOND.CONTROLS.Listener;
  var Controller = VAGABOND.CONTROLS.Controller;
  var Information = VAGABOND.INTERFACE.Information;

  var milo = Object.create(PlayerEntity).init(4, 4, "#", 34, "Milo", "Dwarf", 15);
  var otis = Object.create(Goblin).init(5, 10, 50, "Grot");
  var henry = Object.create(Goblin).init(8, 15, 60, "Snik");

  var map = MAP_FACTORY.createDungeonMap(40, 90);
  map.generate();

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var listener = Object.create(Listener).init();
  var controller = Object.create(Controller).init(listener);
  var level = Object.create(Level).init(map);
  var info = Object.create(Information).init(milo);

  global.level = level;

  listener.eventStack.unshift({state: "do nothing", render: true});

  level.addEntity(milo, otis, henry);

  var i;
  for (i = 0; i < 30; i++) {
    var gobbo = Object.create(Goblin).init(
        Math.floor(Math.random() * map.width),
        Math.floor(Math.random() * map.height),
        50, "#" + i);

    gobbo.getFullName = function() {
      return "Random " + this.type + " " + this.name;
    };

    level.addEntity(gobbo);
  }

  level.setPlayer(milo);

  var func = function() {

    controller.processInput(screen, milo, level, info);

    // TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 30);
  };

  func();

})(this);
