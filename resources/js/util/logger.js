(function() {
  "use strict";

  UTIL.namespace("UTIL.LOGGER");

  UTIL.LOGGER = (function(module) {

    // TODO: test this rather throughly, or look up online to see the safety of this
    var singleton;

    var Logger = {};

    Logger.init = function() {
      this.logs = [];

      return this;
    };

    Logger.log = function(log) {
      this.logs.unshift(log);
    };

    // TODO: figure out where this function should go
    Logger.toSentence = function(subject, verb, object) {
      return "[" + subject + "] " + verb + " [" + object + "]";
    };

    module.getLogger = function() {
      if (singleton === undefined) {
        singleton = Object.create(Logger).init();
      }

      return singleton;
    };

    module.setLogger = function(eventStack) {
      singleton = eventStack;
    };

    module.Logger = Logger;

    return module;

  })(UTIL.LOGGER);
})();
