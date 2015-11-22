(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.VIEW");

  VAGABOND.VIEW = (function(module) {

    var View = VAGABOND.VIEW.View;

    var Logs = Object.create(View);

    Logs.init = function(logger, visibleLogSize) {
      this.logger = logger;
      this.offset = 0;
      this.visibleLogSize = visibleLogSize || 10;

      return this;
    };

    Logs.getSize = function() {
      return this.logger.getSize();
    };

    Logs.toElement = function() {
      var logs = document.createElement("div");
      logs.className = "logs";

      for (var i = this.offset; i < Math.min(this.logger.logs.length, this.offset + this.visibleLogSize); i++) {
        var log = this.logger.logs[i];
        var logElement = document.createElement("span");
        logElement.innerHTML = log.innerHTML;
        logs.appendChild(logElement);
        logs.appendChild(document.createElement("br"));
      }

      return logs;
    };

    module.Logs = Logs;

    return module;
  })(VAGABOND.VIEW);
})();
