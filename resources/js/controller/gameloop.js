"use strict";

var UTIL = require("../util/util");
var MILLISECONDS_PER_SECOND = 1000;

var GameLoop = {};

GameLoop.init = function(timeStep) {

  this.timeStep = timeStep || 1 / 30;

  this.frameCallback = this.frame.bind(this);

  this.processCallback = function() {};

  return this;
};

GameLoop.start = function(processCallback) {
  this.processCallback = processCallback;
  this.frameCallback();
};

GameLoop.frame = function() {

  this.processCallback();

  UTIL.setTimeout(this.frameCallback, this.timeStep * MILLISECONDS_PER_SECOND);
};

module.exports = GameLoop;
