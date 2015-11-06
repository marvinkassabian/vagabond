(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS.MAP_MODES");

  VAGABOND.MAPS.MAP_MODES = (function(module) {

    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var MapModes = {
      diamondSquare: {
        generate: ALGORITHMS.diamondSquare,
        formatValue: function(value) {
          return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
        },
        initValue: function() {
          return UTIL.random(6, 26);
        },
        //TODO: change algorithms, and algorithmArg to take arrays of inputs
        algorithmArgs: [30]
      },
      cellularAutomata: {
        generate: ALGORITHMS.cellularAutomata,
        formatValue: function(value) {
          return value ? "0" : "O";
        },
        initValue: function() {
          return Math.random() > 0.5 ? 1 : 0;
        },
        algorithmArgs: [1]
      }
    };

    //TODO: change to automatically do this via some kind of mapping
    var MapModeNames = ["diamondSquare", "cellularAutomata"];

    module.MapModes = MapModes;
    module.MapModeNames = MapModeNames;

    return module;

  })(VAGABOND.MAPS.MAP_MODES);
})();
