(function(global) {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var DiamondSquareMap = VAGABOND.MAPS.DiamondSquareMap;
  var Screen = VAGABOND.SCREEN.Screen;
  var Game = VAGABOND.GAME.Game;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);
  var diamondSquareMap = Object.create(DiamondSquareMap).init(33, {
    upper: 13,
    lower: 0
  }).generate(20);

  var screen = Object.create(Screen).init(33, 33);

  var entityList = [milo, otis, henry];

  var game = Object.create(Game).init(diamondSquareMap, [], entityList);

  var formatValue = function(value) {
    return Math.floor(Math.max(Math.min(value, 9), 0)).toString(16);
  };

  var mapHTML = diamondSquareMap.toHTML({
    formatValue: formatValue,
    formatElement: function(value) {
      var tileElement = document.createElement('span');
      tileElement.className = 'tile-' + value;

      tileElement.innerHTML = (value > 3) ? 'O' : '0';

      return tileElement;
    }
  });

  var i = 1000;

  var func = function() {
    i--;
    game.takeTurn();
    game.renderTo(screen);

    var screenHTML = screen.toHTML();

    document.body.replaceChild(screenHTML, document.body.firstChild);

    if (i > 0) {
      setTimeout(func, 10);
    }
  };

  func();

})(this);
