(function(global) {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var HeightMap = VAGABOND.MAPS.HeightMap;
  var Screen = VAGABOND.SCREEN.Screen;
  var Game = VAGABOND.GAME.Game;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);
  var heightMap = Object.create(HeightMap).init(33, {
    upper: 16,
    lower: 0
  }).generate(10);

  var screen = Object.create(Screen).init(33, 33);

  var entityList = [milo, otis, henry];

  var game = Object.create(Game).init(heightMap, entityList);

  var i = 1000;

  var func = function() {
    i--;
    game.takeTurn();
    game.renderTo(screen);

    var screenHTML = screen.toHTML();

    document.body.replaceChild(screenHTML, document.body.firstChild);

    if (i > 0) {
      //TODO: switch UTIL.setTimeout to window.requestAnimationFrame
      UTIL.setTimeout(func, 10);
    }
  };

  func();

})(this);
