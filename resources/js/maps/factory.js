(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS.FACTORY");

  VAGABOND.MAPS.FACTORY = (function(module) {

    var Map = VAGABOND.MAPS.Map;

    var createHeightMap = function() {
      var heightMap = Object.create(Map)

      /*diamondSquare: {
        generate: ALGORITHMS.diamondSquare,
        formatValue: function(value) {
          return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
        },
        initValue: function() {
          return UTIL.random(6, 26);
        },
        algorithmArgs: [30]
      }*/

    };

    module.createHeightMap = createHeightMap;

    return module;

  })(VAGABOND.MAPS.FACTORY);
})();
