(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var Matrix = VAGABOND.MATRIX.Matrix;

    var Map = Object.create(Matrix);

    Map.init = function(h, w, mapType, defaults) {
      Matrix.init.call(this, h, w, defaults);

      Map.setDefaults();
    };

    module.Map = Map;

    return module;

  })(VAGABOND.MAPS);
})();
