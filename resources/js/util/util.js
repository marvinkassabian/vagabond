"use strict";

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

exports.ADJACENT = ADJACENT;
exports.VALID_MOVES = VALID_MOVES;
