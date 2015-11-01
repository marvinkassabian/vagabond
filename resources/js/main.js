(function(global) {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;
  var TileMap = VAGABOND.MAPS.TileMap;
  var TerrainMap = VAGABOND.MAPS.TerrainMap;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);
  var tileMap = Object.create(TileMap).init(4, 10);
  var terrainMap = Object.create(TerrainMap).init(129, {
    upper: 10,
    lower: 0
  }, 10);

  global.milo = milo;
  global.otis = otis;
  global.henry = henry;
  global.tileMap = tileMap;
  global.terrainMap = terrainMap;

  //tileMap.render(document.body);
  terrainMap.render(document.body);

})(this);
