(function(global) { // jshint ignore:line
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var MAP_FACTORY = VAGABOND.MAPS.FACTORY;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Listener = VAGABOND.CONTROLS.Listener;
  var Controller = VAGABOND.CONTROLS.Controller;

  var milo = Object.create(Monster).init(4, 4, "#", 34, "Milo", "Beermaster");
  var otis = Object.create(Goblin).init(5, 10, 50, "Kik");
  var henry = Object.create(Goblin).init(8, 15, 60, "Snik");

  var map = MAP_FACTORY.createDungeonMap(40, 90);
  map.generate();

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var listener = Object.create(Listener).init();
  var controller = Object.create(Controller).init(listener);
  var level = Object.create(Level).init(map);

  global.map = map;

  listener.eventStack.unshift({state: "do nothing", render: true});

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

    controller.processInput(screen, milo, level);

    // TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 50);
  };

  func();

})(this);
