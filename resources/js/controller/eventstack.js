(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER");

  VAGABOND.CONTROLLER = (function(module) {

    var singleton;

    var EventStack = {};

    EventStack.getEventStack = function() {
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
      return this.eventStack.pop();
    };

    EventStack.size = function() {
      return this.eventStack.length;
    };

    module.EventStack = EventStack;

    return module;

  })(VAGABOND.CONTROLLER);

})();
