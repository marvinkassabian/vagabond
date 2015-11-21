(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ALGORITHMS");

  VAGABOND.ALGORITHMS = (function(module) {

    var cellularAutomata = function(matrix, rep, nextGenCellReturnFunc) {

      nextGenCellReturnFunc = nextGenCellReturnFunc || function(maxCell) {
        return maxCell;
      };

      for (var i = 0; i < rep; i++) {
        normalize();
      }

      function normalize() {

        var pastMatrix = matrix.clone();
        var getNextCell = getNextGenCell.bind(null, pastMatrix);

        matrix.initGrid(getNextCell);

        function getNextGenCell(matrix, x, y) {

          var maxCell;
          var max = -Infinity;
          var counters = {};

          for (var i = 0; i < UTIL.ADJACENT.length; i++) {
            var move = UTIL.ADJACENT[i];
            var newX = x + move[0];
            var newY = y + move[1];

            if (matrix.isValidCoordinate(newX, newY)) {
              var cell = Math.floor(matrix.get(newX, newY));
              counters[cell] = counters[cell] ? counters[cell] + 1 : 1;
              if (max < counters[cell]) {
                max = counters[cell];
                maxCell = cell;
              }
            }
          }

          return nextGenCellReturnFunc(maxCell, counters);
        }
      }
    };

    module.cellularAutomata = cellularAutomata;

    return module;

  })(VAGABOND.ALGORITHMS);
})();
