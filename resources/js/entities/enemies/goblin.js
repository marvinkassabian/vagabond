(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES.ENEMIES");

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;
    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var Goblin = Object.create(Monster);

    Goblin.init = function(x, y, hp, name) {
      return Monster.init.call(this, x, y, "%", hp, name, "Goblin");
    };

    // TODO: clean this
    Goblin.takeTurn = function(level) {
      Monster.takeTurn.call(this);

      var playerCoor = {
        x: level.player.x,
        y: level.player.y
      };

      var currentPosition = {
        x: this.x,
        y: this.y
      };

      var distance = manhattanDistance(currentPosition, playerCoor);

      if (distance === 1 && level.player.hp > 0) {
        this.attack(level.player, level);
      } else if (distance < 10 && level.player.hp > 0) {
        this.takeNextMove(level);
      } else {
        var nextMove = getRandomMove();

        if (this.isValidMove(nextMove.dx, nextMove.dy, level)) {
          this.move(nextMove.dx, nextMove.dy);
        }
      }
    };

    function getRandomMove() {
      // TODO: move valid moves to a single location
      var moves = UTIL.ADJACENT;

      var randomMove = moves[Math.floor(UTIL.random(moves.length))];

      return {
        dx: randomMove[0],
        dy: randomMove[1]
      };
    }

    // TODO: do something about duplicate function
    function manhattanDistance(origin, destination) {
      var dx = Math.abs(origin.x - destination.x);
      var dy = Math.abs(origin.y - destination.y);
      return dx + dy;
    }

    // TODO: clean this
    Goblin.takeNextMove = function(level) {
      var playerCoor = {
        x: level.player.x,
        y: level.player.y
      };

      var currentPosition = {
        x: this.x,
        y: this.y
      };

      var nextMoves = ALGORITHMS.aStar(level.map.graph, currentPosition, playerCoor);
      var nextMove = nextMoves.shift();

      if (this.isValidMove(nextMove.dx, nextMove.dy, level)) {
        this.move(nextMove.dx, nextMove.dy);
      }
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
