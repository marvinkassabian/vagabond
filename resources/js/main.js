(function(global) {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 30);
  var otis = Object.create(Goblin).init(5, 10, 50);
  console.log(otis);
  var henry = Object.create(Goblin).init(32, 15, 60);

  global.milo = milo;
  global.otis = otis;
  global.henry = henry;

})(this);
