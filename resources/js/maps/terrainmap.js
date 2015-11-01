(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var Map = VAGABOND.MAPS.Map;

    var TerrainMap = Object.create(Map);

    var initProto = Map.init;

    TerrainMap.init = function(size, seedRange, randomScale) {

      this.isGeneratedMap = Object.create(Map);
      this.isGeneratedMap.init(size, size);

      seedRange = UTIL.extend(seedRange, {
        lower: 0,
        upper: 1
      });

      randomScale = (randomScale !== undefined) ? randomScale : 0;

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

      this.generate(randomScale);

      return this;
    };

    TerrainMap.generate = function(scale) {
      var self = this;
      var size = this.width - 1;
      var step = size;

      while(step > 1) {
        diamondSquareStep(step, scale);
        step /= 2;
        scale /= 2;
      }

      function diamondSquareStep(step, scale) {
        var i, j;
        var halfStep = step / 2;

        for (i = halfStep; i <= size + halfStep; i += step) {
          for (j = halfStep; j <= size + halfStep; j += step) {
            if (self.isValidCoordinate(j, i)) {
              diamondStep(j, i, step, scale);
              //self.isGeneratedMap.render(document.body);
              console.log('square', j, i, step);
            }
          }
        }

        for (i = 0; i <= size; i += step) {
          for (j = 0; j <= size; j += step) {
            if (self.isValidCoordinate(j + halfStep, i)) {
              squareStep(j + halfStep, i, step, scale);
              //self.isGeneratedMap.render(document.body);
              console.log('diamond', j + halfStep, i, step);
            }
            if (self.isValidCoordinate(j, i + halfStep)) {
              squareStep(j, i + halfStep, step, scale);
              //self.isGeneratedMap.render(document.body);
              console.log('diamond', j, i + halfStep, step);
            }
          }
        }

        function diamondStep(x, y, step, scale) {
          var possibleCoors = getDiamondCoors(x, y, step);

          self.wrappedSet(x, y, computeNewValue(possibleCoors, scale));
          self.isGeneratedMap.wrappedSet(x, y, self.isGeneratedMap.wrappedGet(x, y) + 1);
        }

        function squareStep(x, y, step, scale) {
          var possibleCoors = getSquareCoors(x, y, step);

          self.wrappedSet(x, y, computeNewValue(possibleCoors, scale));
          self.isGeneratedMap.wrappedSet(x, y, self.isGeneratedMap.wrappedGet(x, y) + 1);
        }

        function computeNewValue(possibleCoors, scale) {
          var i, coor;
          var newValue = 0;
          var validCoorCount = 0;

          for (i = 0; i < possibleCoors.length; i++) {
            coor = possibleCoors[i];
            //if (self.isValidCoordinate(coor.x, coor.y)) {
              newValue += self.wrappedGet(coor.x, coor.y);
              validCoorCount++;
            //}
          }

          newValue /= validCoorCount;

          newValue += ((Math.random() * scale) - (scale / 2));

          return newValue;
        }

        function getDiamondCoors(x, y, step) {
          var halfStep = Math.floor(step / 2);

          return [
            {x: x + halfStep, y: y + halfStep},
            {x: x + halfStep, y: y - halfStep},
            {x: x - halfStep, y: y + halfStep},
            {x: x - halfStep, y: y - halfStep}
          ];
        }

        function getSquareCoors(x, y, step) {
          var halfStep = Math.floor(step / 2);

          return [
            {x: x + halfStep, y: y},
            {x: x - halfStep, y: y},
            {x: x, y: y + halfStep},
            {x: x, y: y - halfStep}
          ];
        }
      }
    };

    module.TerrainMap = TerrainMap;

    return module;

  })(VAGABOND.MAPS);
})();
