(function(global) {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var HeightMap = VAGABOND.MAPS.HeightMap;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;
  var Controls = VAGABOND.CONTROLS.Controls;

  var milo = Object.create(Monster).init(0, 'Milo', 4, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);

  var size = 33;
  var heightMap = Object.create(HeightMap).init(size, {
    upper: 16,
    lower: 0
  }).generate(20);

  var screen = Object.create(Screen).init(10, 10, 0, 0);

  var controls = Object.create(Controls).init();

  global.controls = controls;

  var level = Object.create(Level).init(heightMap);

  global.screen = screen;

  level.addEntity(milo, otis, henry);

  var func = function() {

    if (controls.eventStack.length > 0) {

      var event = controls.eventStack.pop();

      if (event === 'up') {
        screen.move(0, -1);
        if (!heightMap.isValidCoordinate(screen.originX, screen.originY)) {
          screen.move(0, 1);
        }
      } else if (event === 'down') {
        screen.move(0, 1);
        if (!heightMap.isValidCoordinate(screen.originX, screen.originY)) {
          screen.move(0, -1);
        }
      } else if (event === 'left') {
        screen.move(-1, 0);
        if (!heightMap.isValidCoordinate(screen.originX, screen.originY)) {
          screen.move(1, 0);
        }
      } else if (event === 'right') {
        screen.move(1, 0);
        if (!heightMap.isValidCoordinate(screen.originX, screen.originY)) {
          screen.move(-1, 0);
        }
      }

      level.takeTurn();
      level.renderTo(screen);

      var screenHTML = screen.toHTML({
        formatElement: function(value) {
          var tileElement = document.createElement('span');
          tileElement.className = 'tile-' + value[11];
          tileElement.innerHTML = value;

          return tileElement;
        }
      });

      document.body.replaceChild(screenHTML, document.body.firstChild);
    }

    //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
    UTIL.setTimeout(func, 10);
  };

  func();

})(this);
