(function(global) { // jshint ignore:line
  "use strict";

  var PlayerEntity = VAGABOND.ENTITIES.PlayerEntity;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var MAP_FACTORY = VAGABOND.MAPS.FACTORY;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var KeyListener = VAGABOND.CONTROLS.KeyListener;
  var Controller = VAGABOND.CONTROLS.Controller;
  var Information = VAGABOND.INTERFACE.Information;

  var logger = VAGABOND.VIEW.Logger.getLogger();
  var eventStack = VAGABOND.CONTROLLER.EventStack.getEventStack();

  var milo = Object.create(PlayerEntity).init(4, 4, "#", 34, "Milo", "Dwarf", 15);
  var otis = Object.create(Goblin).init(5, 10, 50, "Grot");
  var henry = Object.create(Goblin).init(8, 15, 60, "Snik");

  var map = MAP_FACTORY.createDungeonMap(40, 90);
  map.generate();

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var keyListener = Object.create(KeyListener).init();
  var controller = Object.create(Controller).init(keyListener);
  var level = Object.create(Level).init(map);
  var info = Object.create(Information).init(milo);

  global.level = level;

  eventStack.add({state: "do nothing", render: true});

  level.addEntity(milo, otis, henry);

  var i;
  for (i = 0; i < 10; i++) {
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

    controller.processInput(screen, milo, level, info, logger);

    // TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 30);
  };

  func();

})(this);
