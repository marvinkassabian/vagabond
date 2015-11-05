(function() {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var Matrix = VAGABOND.MATRIX.Matrix;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Controls = VAGABOND.CONTROLS.Controls;
  var ALGORITHMS = VAGABOND.ALGORITHMS;

  var milo = Object.create(Monster).init(0, "Milo", 4, 4, "#", 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(8, 15, 60);

  var map = Object.create(Matrix).init(129, 129, {
    formatValue: function(value) {
      return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
    },
    initValue: function() {
      return UTIL.random(0, 26);
    }
  });

  ALGORITHMS.diamondSquare(60, map);

  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var controls = Object.create(Controls).init();
  var level = Object.create(Level).init(map);

  level.addEntity(milo, otis, henry);

  screen.renderToElement(level, document.body);

  var func = function() {

    if (controls.eventStack.length > 0) {

      var event = controls.eventStack.pop();

      var things = {
        screenUp: {dx: 0, dy: -1, entity: screen, useTurn: false},
        screenDown: {dx: 0, dy: 1, entity: screen, useTurn: false},
        screenLeft: {dx: -1, dy: 0, entity: screen, useTurn: false},
        screenRight: {dx: 1, dy: 0, entity: screen, useTurn: false},
        charUp: {dx: 0, dy: -1, entity: milo, useTurn: true},
        charDown: {dx: 0, dy: 1, entity: milo, useTurn: true},
        charLeft: {dx: -1, dy: 0, entity: milo, useTurn: true},
        charRight: {dx: 1, dy: 0, entity: milo, useTurn: true}
      };

      var move = things[event];

      if (move.entity.isValidMove(move.dx, move.dy, map)) {
        move.entity.move(move.dx, move.dy);
      }

      if (move.useTurn) {
        level.takeTurn();
      }

      screen.renderToElement(level, document.body);
    }

    //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 10);
  };

  func();

})(this);
