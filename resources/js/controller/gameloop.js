"use strict";

var MILLISECONDS_PER_SECOND = 1000;

var GameLoop = {};

GameLoop.init = function(timeStep) {

  this.timeStep = timeStep || 1 / 30;
  this.lastTime = 0;

  this.frameCallback = this.frame.bind(this);

  this.processCallback = function() {};

  return this;
};

GameLoop.start = function(processCallback) {
  this.processCallback = processCallback;
  this.frameCallback();
};

GameLoop.frame = function(time) {

  this.processCallback();

  var seconds = (time - this.lastTime) / MILLISECONDS_PER_SECOND;
  this.lastTime = time;
  this.accumulator += seconds;

  while (this.accumulator >= this.timestep) {
    this.accumulator -= this.timestep;
    this.processCallback(this.timestep);
  }

  window.requestAnimationFrame(this.frameCallback);
};

module.exports = GameLoop;
