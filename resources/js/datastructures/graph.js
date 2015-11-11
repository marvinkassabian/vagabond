(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.GRAPH");

  VAGABOND.GRAPH = (function(module) {

    var Graph = {};

    Graph.init = function(gridIn, options) {
      this.adjacencyMatrix = gridIn;
    };

    module.Graph = Graph;

    return module;

  })(VAGABOND.GRAPH);
})();
