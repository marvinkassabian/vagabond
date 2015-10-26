(function(global) {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 'M', 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  var henry = Object.create(Goblin).init(32, 15, 60);
  var map = Object.create(VAGABOND.MAP.Map).init(4, 10);

  global.milo = milo;
  global.otis = otis;
  global.henry = henry;
  global.map = map;

  map.grid[23].push(otis);
  map.grid[2].push(henry);
  map.grid[31].push(milo);

  var mapElement = document.createElement('div');
  mapElement.innerHTML = map.toString();
  document.body.appendChild(mapElement);

})(this);
