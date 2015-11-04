(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ALGORITHMS');

  VAGABOND.ALGORITHMS = (function(module) {

    var diamondSquare = function(scale, map) {
      var size = map.width - 1;
      var step = size;

      while (step > 1) {
        diamondSquareStep(step, scale, map);
        step /= 2;
        scale /= 2;
      }

      function diamondSquareStep(step, scale, map) {
        var i;
        var j;
        var halfStep = Math.floor(step / 2);

        for (i = halfStep; i <= size + halfStep; i += step) {
          for (j = halfStep; j <= size + halfStep; j += step) {
            if (map.isValidCoordinate(j, i)) {
              diamondStep(j, i, step, scale, map);
            }
          }
        }

        for (i = 0; i <= size; i += step) {
          for (j = 0; j <= size; j += step) {
            if (map.isValidCoordinate(j + halfStep, i)) {
              squareStep(j + halfStep, i, step, scale, map);
            }

            if (map.isValidCoordinate(j, i + halfStep)) {
              squareStep(j, i + halfStep, step, scale, map);
            }
          }
        }

        function diamondStep(x, y, step, scale, map) {
          var possibleCoors = getDiamondCoors(x, y, step);

          map.wrappedSet(x, y, computeNewValue(possibleCoors, scale, map));
        }

        function squareStep(x, y, step, scale, map) {
          var possibleCoors = getSquareCoors(x, y, step);

          map.wrappedSet(x, y, computeNewValue(possibleCoors, scale, map));
        }

        function computeNewValue(possibleCoors, scale, map) {
          var i;
          var coor;
          var newValue = 0;
          var validCoorCount = 0;

          for (i = 0; i < possibleCoors.length; i++) {
            coor = possibleCoors[i];
            if (map.isValidCoordinate(coor.x, coor.y)) {
              newValue += map.wrappedGet(coor.x, coor.y);
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

    module.diamondSquare = diamondSquare;

    return module;

  })(VAGABOND.ALGORITHMS);
})();
