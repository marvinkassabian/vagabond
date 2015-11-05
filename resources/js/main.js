(function(global) {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var Matrix = VAGABOND.MATRIX.Matrix;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Controls = VAGABOND.CONTROLS.Controls;
  var Controller = VAGABOND.CONTROLLER.Controller;
  var ALGORITHMS = VAGABOND.ALGORITHMS;

  var milo = Object.create(Monster).init(0, "Milo", 4, 4, "#", 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(8, 15, 60);

  var map = Object.create(Matrix).init(129, 129, {
    formatValue: function(value) {
      return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
    },
    initValue: function() {
      return Math.random() > 0.5 ? 15 : 0;
      //return UTIL.random(6, 26);
    }
  }).initGrid();

  //ALGORITHMS.diamondSquare(map, 30);
  //ALGORITHMS.cellularAutomata(map, 1);

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var controls = Object.create(Controls).init();
  var controller = Object.create(Controller).init(controls);
  var level = Object.create(Level).init(map);

  level.addEntity(milo, otis, henry);

  global.screen = screen;

  level.renderTo(screen);
  screen.renderToElement(document.body);

  var func = function() {

    controller.processInput(screen, milo, map, level);

    //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 10);
  };

  func();

})(this);
