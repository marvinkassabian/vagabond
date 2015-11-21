(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER.EVENT_STACK");

  VAGABOND.CONTROLLER.EVENT_STACK = (function(module) {

    var EventStack = {};

    var singleton;

    // TODO: decide if this should be a module method, not EventStack
    module.getEventStack = function() {
      if (singleton === undefined) {
        singleton = Object.create(EventStack).init();
      }

      return singleton;
    };

    EventStack.setEventStack = function(eventStack) {
      singleton = eventStack;
    };

    EventStack.init = function() {
      this.eventStack = [];

      return this;
    };

    EventStack.add = function(eventBlob) {
      if (this.eventStack.length === 0) {
        this.eventStack.push(eventBlob);
      }
    };

    EventStack.pop = function() {
      return this.eventStack.pop() || {state: "empty", render: false};
    };

    EventStack.size = function() {
      return this.eventStack.length;
    };

    module.EventStack = EventStack;

    return module;

  })(VAGABOND.CONTROLLER.EVENT_STACK);

})();
