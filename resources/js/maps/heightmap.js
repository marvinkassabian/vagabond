(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var DiamondSquareMap = VAGABOND.MAPS.DiamondSquareMap;

    var HeightMap = Object.create(DiamondSquareMap);

    var initProto = DiamondSquareMap.init;

    HeightMap.init = function(size, seedRange) {
      return initProto.call(this, size, seedRange);
    };

    module.HeightMap = HeightMap;

    return module;

  })(VAGABOND.MAPS);
})();
