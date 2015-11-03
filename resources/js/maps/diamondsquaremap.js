(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var Map = VAGABOND.MAPS.Map;

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
      diamondSquare.call(this, scale);

      return this;
    };

    function diamondSquare(scale) {
      var size = this.width - 1;
      var step = size;

      while(step > 1) {
        diamondSquareStep.call(this, step, scale);
        step /= 2;
        scale /= 2;
      }

      function diamondSquareStep(step, scale) {
        var i;
        var j;
        var halfStep = Math.floor(step / 2);

        for (i = halfStep; i <= size + halfStep; i += step) {
          for (j = halfStep; j <= size + halfStep; j += step) {
            if (this.isValidCoordinate(j, i)) {
              diamondStep.call(this, j, i, step, scale);
            }
          }
        }

        for (i = 0; i <= size; i += step) {
          for (j = 0; j <= size; j += step) {
            if (this.isValidCoordinate(j + halfStep, i)) {
              squareStep.call(this, j + halfStep, i, step, scale);
            }
            if (this.isValidCoordinate(j, i + halfStep)) {
              squareStep.call(this, j, i + halfStep, step, scale);
            }
          }
        }

        function diamondStep(x, y, step, scale) {
          var possibleCoors = getDiamondCoors(x, y, step);

          this.wrappedSet(x, y, computeNewValue.call(this, possibleCoors, scale));
        }

        function squareStep(x, y, step, scale) {
          var possibleCoors = getSquareCoors(x, y, step);

          this.wrappedSet(x, y, computeNewValue.call(this, possibleCoors, scale));
        }

        function computeNewValue(possibleCoors, scale) {
          var i;
          var coor;
          var newValue = 0;
          var validCoorCount = 0;

          for (i = 0; i < possibleCoors.length; i++) {
            coor = possibleCoors[i];
            if (this.isValidCoordinate(coor.x, coor.y)) {
              newValue += this.wrappedGet(coor.x, coor.y);
              validCoorCount++;
            }
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

    module.DiamondSquareMap = DiamondSquareMap;

    return module;

  })(VAGABOND.MAPS);
})();
