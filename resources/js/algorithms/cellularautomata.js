(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ALGORITHMS");

  VAGABOND.ALGORITHMS = (function(module) {

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

          for (i = 0; i < UTIL.ADJACENT.length; i++) {
            move = UTIL.ADJACENT[i];
            newX = x + move[0];
            newY = y + move[1];

            if (matrix.isValidCoordinate(newX, newY)) {
              cell = Math.floor(matrix.get(newX, newY));
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

    module.cellularAutomata = cellularAutomata;

    return module;

  })(VAGABOND.ALGORITHMS);
})();
