(function(global) { // jshint ignore:line
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var FACTORY = VAGABOND.MAPS.FACTORY;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Listener = VAGABOND.CONTROLS.Listener;
  var Controller = VAGABOND.CONTROLS.Controller;

  var milo = Object.create(Monster).init(0, "Milo", 4, 4, "#", 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(8, 15, 60);

  var map = FACTORY.createDungeonMap(100, 200);//.createHeightMap(129);

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var listener = Object.create(Listener).init();
  var controller = Object.create(Controller).init(listener);
  var level = Object.create(Level).init(map);

  listener.eventStack.unshift({state: "algorithm", render: true}, {state: "initMap", render: false});
  level.addEntity(milo, otis, henry);

  var func = function() {

    controller.processInput(screen, milo, map, level);

    //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 10);
  };

  func();

})(this);
