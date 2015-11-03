(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.ENTITIES.ENEMIES');

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = Object.create(Monster);

    var initProto = Goblin.init;

    Goblin.init = function(x, y, hp) {
      return initProto.call(this, UTIL.generateUUID(), 'Goblin', x, y, 'G', hp);
    };

    Goblin.attack = function() {
      console.log(this.name, 'attacks!');
    };

    Goblin.takeTurn = function(level) {
      var possibleMove = [
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: -1, dy: 0},
        {dx: 0, dy: -1}
      ];

      var move = possibleMove[Math.floor(Math.random() * 4)];

      if (this.isValidMove(move.dx, move.dy, level.map)) {
        this.move(move.dx, move.dy);
      }
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
