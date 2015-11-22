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

    var EventStack = {};

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
      return this.eventStack.pop() || {state: "nothing", render: false};
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
