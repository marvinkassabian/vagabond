(function() {
  'use strict';

  var entities = VAGABOND.ENTITIES;

  var milo = new entities.Monster(0, 'Milo', 2, 4, 30);
  var otis = new entities.KillableEntity(5, 10, 50);

  console.log(milo.toString(null, '\t'));
  console.log(otis.toString(null, '\t'));

})();
