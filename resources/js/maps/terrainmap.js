(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var Map = VAGABOND.MAPS.Map;

    var TerrainMap = Object.create(Map);

    var initProto = Map.init;

    TerrainMap.init = function(size, seedRange) {
      seedRange = UTIL.extend(seedRange, {
        lower: 0,
        upper: 1
      });

      initProto.call(this, size, size, function(x, y, w, h) {
        if ((x === 0 && y === 0) ||
            (x === 0 && y === h - 1) ||
            (x === w - 1 && y === 0) ||
            (x === w - 1 && y === h - 1)) {
          return (Math.random() * (seedRange.upper - seedRange.lower)) + seedRange.lower;
        } else {
          return 0;
        }
      });

      this.generate();

      return this;
    };

    TerrainMap.generate = function() {
      var size = this.width - 1;

      diamondStep(size / 2, size / 2, size, 0, this);

      function diamondStep(x, y, step, scale, map) {
        var halfStep = Math.floor(step / 2);

        if (step === 0) {
          return;
        }

        var newValue = (map.getSample(x + halfStep, y + halfStep) +
            map.getSample(x + halfStep, y - halfStep) +
            map.getSample(x - halfStep, y + halfStep) +
            map.getSample(x - halfStep, y - halfStep)) / 4;

        newValue += ((Math.random() * scale) - (scale / 2));

        map.setSample(x, y, newValue);
      }

      function squareStep(x, y, step, scale, map) {
        var halfStep = Math.floor(step / 2);

        if (step === 0) {
          return;
        }

        var newValue = (map.getSample(x + halfStep, y) +
            map.getSample(x - halfStep, y) +
            map.getSample(x, y + halfStep) +
            map.getSample(x, y - halfStep)) / 4;

        newValue += ((Math.random() * scale) - (scale / 2));

        map.setSample(x, y, newValue);
      }
    };

    module.TerrainMap = TerrainMap;

    return module;

  })(VAGABOND.MAPS);
})();
