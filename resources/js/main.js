(function() {
  'use strict';

  var Monster = VAGABOND.ENTITIES.Monster;

  var milo = new Monster().init(2, 5, 30, 4, 6);

  console.log(milo.getCoor());
  console.log(milo.getHealth());
  console.log(milo.getDefense());
  milo.takeDamage(10);
  console.log(milo.getHealth());

  var otis = new Monster().init(0, 0, 50, 30, 10);
  console.log(otis.getCoor());
  console.log(milo.getCoor());
  console.log(milo.getHealth());
  console.log(otis);
})();
