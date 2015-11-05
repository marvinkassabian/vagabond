(function() {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var HeightMap = VAGABOND.MAPS.HeightMap;
  var Map = VAGABOND.MAPS.Map;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Controls = VAGABOND.CONTROLS.Controls;
  var ALGORITHMS = VAGABOND.ALGORITHMS;

  var milo = Object.create(Monster).init(0, "Milo", 4, 4, "#", 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(8, 15, 60);

  var map = Object.create(Map).init(129, 129, {
    formatValue: function(value) {
      return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
    },
    initValue: function() {
      //return (Math.random() * (seedRange.upper - seedRange.lower)) + seedRange.lower;
      return Math.random() * 26;
    }
  });

  map.generate(ALGORITHMS.diamondSquare, 30, map);

  var heightMap = Object.create(HeightMap).init(129, {
    upper: 26,
    lower: 0
  }).generate(30);
  var screen = Object.create(Screen).init(20, 80, 0, 0);
  var controls = Object.create(Controls).init();
  var level = Object.create(Level).init(map);

  level.addEntity(milo, otis, henry);

  screen.renderToElement(level, document.body);

  var func = function() {

    if (controls.eventStack.length > 0) {

      var event = controls.eventStack.pop();

      if (event === "screenUp") {
        if (screen.isValidMove(0, -1, heightMap)) {
          screen.move(0, -1);
        }
      } else if (event === "screenDown") {
        if (screen.isValidMove(0, 1, heightMap)) {
          screen.move(0, 1);
        }
      } else if (event === "screenLeft") {
        if (screen.isValidMove(-1, 0, heightMap)) {
          screen.move(-1, 0);
        }
      } else if (event === "screenRight") {
        if (screen.isValidMove(1, 0, heightMap)) {
          screen.move(1, 0);
        }
      } else if (event === "charUp") {
        if (milo.isValidMove(0, -1, heightMap)) {
          milo.move(0, -1);
        }
      } else if (event === "charDown") {
        if (milo.isValidMove(0, 1, heightMap)) {
          milo.move(0, 1);
        }
      } else if (event === "charLeft") {
        if (milo.isValidMove(-1, 0, heightMap)) {
          milo.move(-1, 0);
        }
      } else if (event === "charRight") {
        if (milo.isValidMove(1, 0, heightMap)) {
          milo.move(1, 0);
        }
      }

      level.takeTurn();
      screen.renderToElement(level, document.body);
    }

    //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 10);
  };

  func();

})(this);
