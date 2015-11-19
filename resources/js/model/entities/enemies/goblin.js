(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES.ENEMIES");

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;
    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var Goblin = Object.create(Monster);

    Goblin.init = function(x, y, hp, name) {
      this.aStarWeights = [UTIL.random(10, 1), UTIL.random(5, 1)];
      return Monster.init.call(this, x, y, "%", hp, name, "Goblin", 3);
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

      var distance = UTIL.manhattanDistance(currentPosition, playerCoor);

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
      var moves = UTIL.VALID_MOVES;

      var randomMove = moves[Math.floor(UTIL.random(moves.length))];

      return {
        dx: randomMove[0],
        dy: randomMove[1]
      };
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

      var nextMoves = ALGORITHMS.aStar(level.map.graph, currentPosition, playerCoor, function(origin, destination) {
        return this.aStarWeights[0] * UTIL.distance(origin, destination, this.aStarWeights[1]);
      }.bind(this));
      var nextMove = nextMoves.shift();

      if (this.isValidMove(nextMove.dx, nextMove.dy, level)) {
        this.move(nextMove.dx, nextMove.dy);
      }
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
