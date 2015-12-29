(function(global) { // jshint ignore:line
  "use strict";

  var PlayerEntity = VAGABOND.MODEL.ENTITIES.PlayerEntity;
  var Goblin = VAGABOND.MODEL.ENTITIES.ENEMIES.Goblin;
  var MAP_FACTORY = VAGABOND.MODEL.MAPS.FACTORY;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.MODEL.Level;
  var KeyListener = VAGABOND.CONTROLLER.KeyListener;
  var Controller = VAGABOND.CONTROLLER.Controller;
  // var GameLoop = VAGABOND.CONTROLLER.GameLoop;
  var Information = VAGABOND.VIEW.Information;
  var Logs = VAGABOND.VIEW.Logs;

  var logger = UTIL.LOGGER.getLogger();
  var eventStack = VAGABOND.CONTROLLER.EVENT_STACK.getEventStack();

  // models
  var milo = Object.create(PlayerEntity).init(10, 10, "#", 34, "Milo", "Dwarf", 15);
  var otis = Object.create(Goblin).init(5, 10, 50, "Grot");
  var henry = Object.create(Goblin).init(8, 15, 60, "Snik");

  var map = MAP_FACTORY.createDungeonMap(40, 129);

  var level = Object.create(Level).init(map);

  // controllers
  var keyListener = Object.create(KeyListener).init();
  var controller = Object.create(Controller).init(keyListener);

  // views
  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var info = Object.create(Information).init(milo);
  var logs = Object.create(Logs).init(logger, 13);

  global.level = level;

  eventStack.addEvent({state: "generate", render: true});

  level.addEntity(milo, otis, henry);

  var i;
  for (i = 0; i < 0; i++) {
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

    controller.processInput(screen, milo, level, info, logs);

    // TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 30);
  };

  func();

  // var gameLoop = Object.create(GameLoop).init(1 / 40);
  // gameLoop.start(controller.processInput.bind(controller, screen, milo, level, info, logs));

})(this);
