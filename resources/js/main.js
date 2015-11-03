(function(global) {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var HeightMap = VAGABOND.MAPS.HeightMap;
  var Screen = VAGABOND.SCREEN.Screen;
  var Level = VAGABOND.LEVEL.Level;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);

  var size = 129;
  var heightMap = Object.create(HeightMap).init(size, {
    upper: 16,
    lower: 0
  }).generate(20);

  var screen = Object.create(Screen).init(20, 80, 0, 0);

  var level = Object.create(Level).init(heightMap);

  global.screen = screen;

  level.addEntity(milo, otis, henry);

  var i = 1000;

  var func = function() {
    i--;
    level.takeTurn();
    level.renderTo(screen);

    var screenHTML = screen.toHTML();

    document.body.replaceChild(screenHTML, document.body.firstChild);

    if (i > 0) {
      //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
      UTIL.setTimeout(func, 100);
    }
  };

  func();

})(this);
