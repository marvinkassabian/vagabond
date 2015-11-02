(function(global) {
  "use strict";

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var TileMap = VAGABOND.MAPS.TileMap;
  var DiamondSquareMap = VAGABOND.MAPS.DiamondSquareMap;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);
  var diamondSquareMap = Object.create(DiamondSquareMap).init(129, {
    upper: 10,
    lower: 0
  }, 20);

  global.milo = milo;
  global.otis = otis;
  global.henry = henry;
  global.diamondSquareMap = diamondSquareMap;

  diamondSquareMap.renderToHTML(document.body, {
    formatValue: function(value) {
      return Math.floor(Math.max(Math.min(value, 15), 0)).toString(16);
    }
  });

})(this);
