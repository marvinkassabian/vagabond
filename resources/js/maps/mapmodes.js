(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var MAP_MODES = [
      {
        name: "diamondSquare",
        algorithm: ALGORITHMS.diamondSquare,
        formatValue: function(value) {
          return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
        },
        initValue: function() {
          return UTIL.random(6, 26);
        },
        //TODO: change algorithms, and algorithmArg to take arrays of inputs
        algorithmArg: 30
      },
      {
        name: "cellularAutomata",
        algorithm: ALGORITHMS.cellularAutomata,
        formatValue: function(value) {
          return value ? "0" : "O";
        },
        initValue: function() {
          return Math.random() > 0.5 ? 1 : 0;
        },
        algorithmArg: 1
      }
    ];

    module.MAP_MODES = MAP_MODES;

    return module;

  })(VAGABOND.MAPS);
})();
