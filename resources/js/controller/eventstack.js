"use strict";

var EventStack = {};

EventStack.init = function() {
  this.eventStack = [];

  return this;
};

EventStack.addEvent = function(eventBlob) {
  if (this.eventStack.length === 0) {
    this.eventStack.push(eventBlob);
  }
};

EventStack.addEventSequence = function(eventBlobs) {
  if (this.eventStack.length === 0) {
    for (var i = 0; i < eventBlobs.length; i++) {
      this.eventStack.push(eventBlobs[i]);
    }
  }
};

EventStack.getEvent = function() {
  return this.eventStack.shift() || {state: "nothing", render: false};
};

EventStack.getSize = function() {
  return this.eventStack.length;
};

module.exports = Object.create(EventStack).init();
