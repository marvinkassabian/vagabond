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

    this.namespace = namespace;

    return this;
  }).call(VAGABOND || {});

  global.VAGABOND = VAGABOND;

})(this);
