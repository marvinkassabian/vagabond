(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var Matrix = VAGABOND.DATA_STRUCTURES.MATRIX.Matrix;
    var Graph = VAGABOND.DATA_STRUCTURES.GRAPH.Graph;

    var Map = Object.create(Matrix);

    Map.init = function(h, w, defaults) {
      Matrix.init.call(this, h, w, defaults);

      // TODO: probably just mix graph and map together
      this.graph = Object.create(Graph);

      return this;
    };

    Map.initGrid = function(initValueFunc) {
      Matrix.initGrid.call(this, initValueFunc);

      this.graph.init(this);
    };

    Map.renderTo = function(screen, formatValue) {
      var i, j, offset;

      if (formatValue === undefined) {
        formatValue = this.defaults.formatValue;
      }

      offset = screen.getOrigin();

      for (i = offset.y; i < screen.height + offset.y; i++) {
        for (j = offset.x; j < screen.width + offset.x; j++) {

          if (this.isValidCoordinate(j, i)) {
            screen.set(j - offset.x, i - offset.y,
                formatValue.call(this, this.get(j, i), j, i));
          }
        }
      }
    };

    Map.generate = function() {

    };

    module.Map = Map;

    return module;

  })(VAGABOND.MAPS);
})();
