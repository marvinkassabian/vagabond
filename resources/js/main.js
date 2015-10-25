(function(global) {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;

  var milo = Object.create(Monster).init(0, 'Milo', 2, 4, 30);
  var otis = Object.create(Goblin).init(5, 10, 50);

  global.milo = milo;
  global.otis = otis;

})(this);
