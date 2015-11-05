(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ALGORITHMS");

  VAGABOND.ALGORITHMS = (function(module) {

    //TODO: clean up code at some point
    var diamondSquare = function(matrix, scale) {
      var size = matrix.width - 1;
      var step = size;

      while (step > 1) {
        diamondSquareStep(step, scale);
        step /= 2;
        scale /= 2;
      }

      function diamondSquareStep(step, scale) {
        var i;
        var j;
        var halfStep = Math.floor(step / 2);

        for (i = halfStep; i <= size + halfStep; i += step) {
          for (j = halfStep; j <= size + halfStep; j += step) {
            if (matrix.isValidCoordinate(j, i)) {
              diamondStep(j, i, step, scale, matrix);
            }
          }
        }

        for (i = 0; i <= size; i += step) {
          for (j = 0; j <= size; j += step) {
            if (matrix.isValidCoordinate(j + halfStep, i)) {
              squareStep(j + halfStep, i, step, scale, matrix);
            }

            if (matrix.isValidCoordinate(j, i + halfStep)) {
              squareStep(j, i + halfStep, step, scale, matrix);
            }
          }
        }

        function diamondStep(x, y, step, scale, matrix) {
          var possibleCoors = getDiamondCoors(x, y, step);

          matrix.wrappedSet(x, y, computeNewValue(possibleCoors, scale, matrix));
        }

        function squareStep(x, y, step, scale, matrix) {
          var possibleCoors = getSquareCoors(x, y, step);

          matrix.wrappedSet(x, y, computeNewValue(possibleCoors, scale, matrix));
        }

        function computeNewValue(possibleCoors, scale, matrix) {
          var i;
          var coor;
          var newValue = 0;
          var validCoorCount = 0;

          for (i = 0; i < possibleCoors.length; i++) {
            coor = possibleCoors[i];
            if (matrix.isValidCoordinate(coor.x, coor.y)) {
              newValue += matrix.wrappedGet(coor.x, coor.y);
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
            { x: x + halfStep, y: y + halfStep},
            { x: x + halfStep, y: y - halfStep},
            { x: x - halfStep, y: y + halfStep},
            { x: x - halfStep, y: y - halfStep}
          ];
        }

        function getSquareCoors(x, y, step) {
          var halfStep = Math.floor(step / 2);

          return [
            { x: x + halfStep, y: y},
            { x: x - halfStep, y: y},
            { x: x, y: y + halfStep},
            { x: x, y: y - halfStep}
          ];
        }
      }
    };

    var cellularAutomata = function(matrix, rep) {
      var i;

      for (i = 0; i < rep; i++) {
        normalize();
      }

      function normalize() {
        var pastMatrix = matrix.clone();
        var getNextCell = getNextGenCell.bind(null, pastMatrix);

        matrix.initGrid(getNextCell);

        function getNextGenCell(matrix, x, y) {
          var i, move, newX, newY, cell, maxCell;
          var max = -Infinity;
          var counters = {};
          // also includes the center with [0, 0]
          var ADJACENT = [
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [0, 0]
          ];

          for (i = 0; i < ADJACENT.length; i++) {
            move = ADJACENT[i];
            newX = x + move[0];
            newY = y + move[1];

            if (matrix.isValidCoordinate(newX, newY)) {
              cell = matrix.get(newX, newY);
              counters[cell] = counters[cell] ? counters[cell] + 1 : 1;
              if (max < counters[cell]) {
                max = counters[cell];
                maxCell = cell;
              }
            }
          }

          return maxCell;
        }
      }
    };

    module.diamondSquare = diamondSquare;
    module.cellularAutomata = cellularAutomata;

    return module;

  })(VAGABOND.ALGORITHMS);
})();
