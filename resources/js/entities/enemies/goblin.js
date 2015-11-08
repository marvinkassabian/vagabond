(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES.ENEMIES");

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;

    var Goblin = Object.create(Monster);

    Goblin.init = function(x, y, hp) {
      return Monster.init.call(this, UTIL.generateUUID(), "Goblin", x, y, "%", hp);
    };

    //TODO: clean this
    Goblin.attack = function(entity) {
      console.log(this.name, "attacks!");
      entity.hp -= 10;
      if (entity.hp < 0) {
        console.log(entity.name, "is dead!");
      }
    };

    //TODO: clean this
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

      if (manhattanDistance(currentPosition, playerCoor) === 1) {
        this.attack(level.player, level);
      } else {
        this.takeNextMove(level);
      }
    };

    function manhattanDistance(origin, destination) {
      var dx = Math.abs(origin.x - destination.x);
      var dy = Math.abs(origin.y - destination.y);
      return dx + dy;
    }

    //TODO: clean this
    Goblin.takeNextMove = function(level) {
      var i, move, possibleNextPosition, nextPosition, distance, nextMove;
      var min = Infinity;
      var possibleMove = [
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: -1, dy: 0},
        {dx: 0, dy: -1}
      ];

      var playerCoor = {
        x: level.player.x,
        y: level.player.y
      };

      for (i = 0; i < possibleMove.length; i++) {
        move = possibleMove[i];

        if (this.isValidMove(move.dx, move.dy, level)) {
          possibleNextPosition = {
            x: this.x + move.dx,
            y: this.y + move.dy
          };

          distance = manhattanDistance(possibleNextPosition, playerCoor);

          if (min > distance) {
            min = distance;
            nextMove = move;
            nextPosition = possibleNextPosition;
          }
        }
      }

      if (nextMove) {
        var currentPosition = {
          x: this.x,
          y: this.y
        };

        var newPosDis = manhattanDistance(nextPosition, playerCoor);
        var oldPosDis = manhattanDistance(currentPosition, playerCoor);

        if (this.isValidMove(nextMove.dx, nextMove.dy, level) && newPosDis < oldPosDis) {

          this.move(nextMove.dx, nextMove.dy);
        }
      }
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
