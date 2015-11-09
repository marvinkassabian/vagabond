(function(global) { // jshint ignore:line
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var MAP_FACTORY = VAGABOND.MAPS.FACTORY;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Listener = VAGABOND.CONTROLS.Listener;
  var Controller = VAGABOND.CONTROLS.Controller;

  var milo = Object.create(Monster).init(0, "Milo", 4, 4, "#", 34);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(8, 15, 60);

  var map = MAP_FACTORY.createDungeonMap(129, 129);

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var listener = Object.create(Listener).init();
  var controller = Object.create(Controller).init(listener);
  var level = Object.create(Level).init(map);

  listener.eventStack.unshift({state: "generate", render: true});

  level.addEntity(milo, otis, henry);

  var i;
  for (i = 0; i < 30; i++) {
    level.addEntity(Object.create(Goblin).init(Math.floor(Math.random() * 129), Math.floor(Math.random() * 129), 50));
  }

  level.setPlayer(milo);

  var func = function() {

    controller.processInput(screen, milo, level);

    //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 50);
  };

  func();

})(this);
