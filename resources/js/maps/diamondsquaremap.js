(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var Map = VAGABOND.MAPS.Map;
    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var DiamondSquareMap = Object.create(Map);

    var initProto = Map.init;

    DiamondSquareMap.init = function(size, seedRange) {

      seedRange = UTIL.extend(seedRange, {
        lower: 0,
        upper: 1
      });

      initProto.call(this, size, size, function() {
        return (Math.random() * (seedRange.upper - seedRange.lower)) + seedRange.lower;
      });

      return this;
    };

    DiamondSquareMap.generate = function(scale) {
      scale = (scale !== undefined) ? scale : 0;
      ALGORITHMS.diamondSquare(scale, this);

      return this;
    };

    module.DiamondSquareMap = DiamondSquareMap;

    return module;

  })(VAGABOND.MAPS);
})();
