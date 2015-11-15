(function(global) {
  "use strict";

  var VAGABOND = (function() {

    var namespace = function() {
      var i, j, d;
      var a = arguments;
      var o = null;

      for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = VAGABOND;

        for (j = ((d[0] === "VAGABOND") ? 1 : 0); j < d.length; j++) {
          o[d[j]] = o[d[j]] || {};
          o = o[d[j]];
        }
      }

      return o;
    };

    // TODO: make a DOM editor module and move this to it
    var writeToLog = function(string) {
      var log = document.body.getElementsByClassName("log")[0];
      var line = document.createElement("span");
      line.innerText = string + "\n";
      log.insertBefore(line, log.firstChild);
      // log.appendChild(line);
    };

    this.namespace = namespace;
    this.writeToLog = writeToLog;

    return this;
  }).call(VAGABOND || {});

  global.VAGABOND = VAGABOND;

})(this);
