(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER.EVENT_STACK");

  VAGABOND.CONTROLLER.EVENT_STACK = (function(module) {

    // TODO: test this rather throughly, or look up online to see the safety of this
    var singleton;

    var getEventStack = function() {
      if (singleton === undefined) {
        singleton = Object.create(EventStack).init();
      }

      return singleton;
    };

    var setEventStack = function(eventStack) {
      singleton = eventStack;
    };

    // TODO: figure out how to block events while page is rendering
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

    module.getEventStack = getEventStack;
    module.setEventStack = setEventStack;
    module.EventStack = EventStack;

    return module;

  })(VAGABOND.CONTROLLER.EVENT_STACK);

})();
