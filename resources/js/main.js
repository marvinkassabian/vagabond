(function(global) {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;
  var Goblin = VAGABOND.ENTITIES.ENEMIES.Goblin;

  var milo = new Monster(0, 'Milo', 2, 4, 30);
  var otis = new Goblin(5, 10, 50);

  console.log(milo.toString(null, '\t'));
  console.log(otis.toString(null, '\t'));
  console.log(milo);

  global.milo = milo;
  global.otis = otis;

})(this);
