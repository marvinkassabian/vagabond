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

    var aStar = function(graph, startCoor, endCoor) {
      var vertex, i, neighbor;
      var dirtyVertices = [];
      var remaining = [];
      var found = false;

      for (var vertexID in graph.vertices) {
        vertex = cleanVertex(graph.vertices[vertexID]);
        if (vertex.x === startCoor.x && vertex.y === startCoor.y) {
          vertex.pathWeight = 0;
        }

        remaining.push(vertex);
      }

      while (!found && remaining.length !== 0) {
        remaining.sort(function(a, b) {
          return (a.getTotal() - b.getTotal()) * -1;
        });

        vertex = remaining.pop();
        dirtyVertices.push(vertex);

        for (i = 0; i < vertex.neighbors.length; i++) {
          neighbor = vertex.neighbors[i];
          if (dirtyVertices.indexOf(neighbor) === -1) {
            neighbor.pathWeight = vertex.pathWeight + graph.getEdgeValue(vertex, neighbor);
            neighbor.previousVertex = vertex;
            dirtyVertices.push(neighbor);
            remaining.push(neighbor);
            if (neighbor.x === endCoor.x && neighbor.y === endCoor.y) {
              found = true;
            }
          }
        }
      }

      return toMoveArray(graph.getVertex(endCoor.x, endCoor.y));

      function cleanVertex(vertex) {
        vertex.pathWeight = Infinity;
        //TODO: decouple heuristic
        vertex.heuristic = 1 * manhattanDistance(vertex, endCoor);
        vertex.getTotal = function() {
          return this.pathWeight + this.heuristic;
        };

        vertex.previousVertex = undefined;

        return vertex;
      }

      function manhattanDistance(vertexX, vertexY) {
        return Math.abs(vertexX.x - vertexY.x) + Math.abs(vertexX.y - vertexY.y);
      }

      function toMoveArray(vertex) {
        var ret = [];

        while (vertex.previousVertex !== undefined) {
          var previous = vertex.previousVertex;
          ret.unshift({dx: vertex.x - previous.x, dy: vertex.y - previous.y});
          vertex = previous;
        }

        return ret;
      }
    };

    module.diamondSquare = diamondSquare;
    module.cellularAutomata = cellularAutomata;
    module.aStar = aStar;

    return module;

  })(VAGABOND.ALGORITHMS);
})();
