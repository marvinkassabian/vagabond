(function() {
  'use strict';

  var e = VAGABOND.ENTITIES;

  var milo = new e.Monster(0, 'Milo', 2, 4, 30);
  var otis = new e.KillableEntity(5, 10, 50);

  console.log(milo);
  console.log(otis);

})();
