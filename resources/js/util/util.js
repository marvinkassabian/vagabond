"use strict";

// clamps the value in the range of [min, max]
var clamp = function(value, min, max) {
  var temp;

  if (min > max) {
    temp = min;
    min = max;
    max = temp;
  }

  return Math.max(Math.min(value, max), min);
};

// wraps the value in the range of [min, max)
var wrap = function(value, min, max) {
  var temp;
  var range;

  if (min > max) {
    temp = min;
    min = max;
    max = temp;
  }

  range = max - min;

  return ((((value - min) % range) + range) % range) + min;
};

var random = function(upper, lower) {
  var temp;

  if (upper === undefined) {
    upper = 1;
  }

  if (lower === undefined) {
    lower = 0;
  }

  if (lower > upper) {
    temp = lower;
    lower = upper;
    upper = temp;
  }

  return (Math.random() * (upper - lower)) + lower;
};

// src: Underscore.js
var shuffle = function(obj) {
  var set = obj;
  var length = set.length;
  var shuffled = [];
  for (var index = 0, rand; index < length; index++) {
    rand = Math.floor(random(0, index));
    if (rand !== index) {
      shuffled[index] = shuffled[rand];
    }

    shuffled[rand] = set[index];
  }

  return shuffled;
};

// TODO: rename this to better reflect what it is
var ADJACENT = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
  [0, 0]
];

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

// TODO: replace the following 3 methods with require("distance-calc")
var distance = function(origin, destination, power) {
  var dx = Math.pow(Math.abs(origin.x - destination.x), power);
  var dy = Math.pow(Math.abs(origin.y - destination.y), power);
  return Math.pow(dx + dy, 1 / power);
};

var manhattanDistance = function(origin, destination) {
  var dx = Math.abs(origin.x - destination.x);
  var dy = Math.abs(origin.y - destination.y);
  return dx + dy;
};

var straightLineDistance = function(origin, destination) {
  return distance(origin, destination, 2);
};

exports.clamp = clamp;
exports.wrap = wrap;
exports.random = random;
exports.shuffle = shuffle;
exports.ADJACENT = ADJACENT;
exports.VALID_MOVES = VALID_MOVES;
exports.manhattanDistance = manhattanDistance;
exports.straightLineDistance = straightLineDistance;
exports.distance = distance;
