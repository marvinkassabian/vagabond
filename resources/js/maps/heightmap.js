(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var DiamondSquareMap = VAGABOND.MAPS.DiamondSquareMap;

    var HeightMap = Object.create(DiamondSquareMap);

    var initProto = DiamondSquareMap.init;
    var renderToProto = DiamondSquareMap.renderTo;

    HeightMap.init = function(size, seedRange) {
      return initProto.call(this, size, seedRange);
    };

    HeightMap.renderTo = function(screen) {
      renderToProto.call(this, screen, function(value) {
        return Math.floor(Math.max(Math.min(value, 15), 0)).toString(16);
      });
    };

    module.HeightMap = HeightMap;

    return module;

  })(VAGABOND.MAPS);
})();
