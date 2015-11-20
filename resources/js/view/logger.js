(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.VIEW");

  // TODO: move logger out of view, and only leave Logger.toElement here,
  // TODO: where logger is passed to the render function
  VAGABOND.VIEW = (function(module) {

    var View = VAGABOND.VIEW.View;

    var Logger = Object.create(View);

    var singleton;

    Logger.getLogger = function() {
      if (singleton === undefined) {
        singleton = Object.create(Logger).init();
      }

      return singleton;
    };

    Logger.setLogger = function(logger) {
      singleton = logger;
    };

    Logger.init = function() {
      this.logs = [];
      this.offset = 0;

      return this;
    };

    Logger.log = function(string) {
      this.logs.unshift(string);
    };

    Logger.toSentence = function(subject, verb, object) {
      return "[" + subject + "] " + verb + " [" + object + "]";
    };

    Logger.toElement = function() {
      var logs = document.createElement("div");
      logs.className = "logs";

      for (var i = this.offset; i < this.logs.length; i++) {
        var log = this.logs[i];
        var logElement = document.createElement("span");
        logElement.innerHTML = log;
        logs.appendChild(logElement);
        logs.appendChild(document.createElement("br"));
      }

      return logs;
    };

    module.Logger = Logger;

    return module;
  })(VAGABOND.VIEW);
})();
