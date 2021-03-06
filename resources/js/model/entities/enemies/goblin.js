"use strict";

var VALID_MOVES = [
  // [1, 1],
  // [1, -1],
  // [-1, -1],
  // [-1, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1]
];

var random = require("random-js")();
var d = require("distance-calc");
var Monster = require("../monster");
var aStar = require("../../../algorithms/astar");

var Goblin = Object.create(Monster);

Goblin.init = function(x, y, hp, name) {
  this.aStarWeights = [random.real(10, 1), random.real(5, 1)];
  return Monster.init.call(this, x, y, "%", hp, name, "Goblin", 3);
};

// TODO: clean this
Goblin.takeTurn = function(level) {
  Monster.takeTurn.call(this);

  if (this.isDead()) {
    return;
  }

  var playerCoor = {
    x: level.player.x,
    y: level.player.y
  };

  var currentPosition = {
    x: this.x,
    y: this.y
  };

  var distance = d.norm([currentPosition.x, currentPosition.y], [playerCoor.x, playerCoor.y], 1);

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
  var randomMove = VALID_MOVES[random.integer(0, VALID_MOVES.length - 1)];

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

  var nextMoves = aStar(level.map.graph, currentPosition, playerCoor, function(origin, destination) {
    return this.aStarWeights[0] * d.norm([origin.x, origin.y], [destination.x, destination.y], this.aStarWeights[1]);
  }.bind(this));
  var nextMove = nextMoves.shift();

  if (this.isValidMove(nextMove.dx, nextMove.dy, level)) {
    this.move(nextMove.dx, nextMove.dy);
  }
};

module.exports = Goblin;
