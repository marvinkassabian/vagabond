(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES.ENEMIES");

  VAGABOND.ENTITIES.ENEMIES = (function(module) {

    var Monster = VAGABOND.ENTITIES.Monster;
    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var Goblin = Object.create(Monster);

    Goblin.init = function(x, y, hp) {
      return Monster.init.call(this, UTIL.generateUUID(), "Goblin", x, y, "%", hp);
    };

    //TODO: clean this
    Goblin.attack = function(entity) {
      console.log(this.name, "attacks!");
      entity.hp -= 10;
      if (entity.hp < 0) {
        //TODO: turn into a function
        console.log(entity.name, "is dead!");
        entity.move = function() {};

        entity.char = "X";
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
      var playerCoor = {
        x: level.player.x,
        y: level.player.y
      };

      var currentPosition = {
        x: this.x,
        y: this.y
      };

      var nextMoves = ALGORITHMS.aStar(level.graph, currentPosition, playerCoor);
      var nextMove = nextMoves.shift();

      if (this.isValidMove(nextMove.dx, nextMove.dy, level)) {
        this.move(nextMove.dx, nextMove.dy);
      }
    };

    module.Goblin = Goblin;

    return module;
  })(VAGABOND.ENTITIES.ENEMIES);
})();
