(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.GRAPH");

  VAGABOND.GRAPH = (function(module) {

    var Matrix = VAGABOND.MATRIX.Matrix;

    var Vertex = {};

    Vertex.init = function(id, x, y, weight) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.weight = weight;
      this.neighbors = [];
      this.entities = [];

      return this;
    };

    var ADJACENT = [
      // [1, 1],
      // [1, -1],
      // [-1, -1],
      // [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1]
    ];

    var Graph = {};

    //TODO: all for different init functions
    //      i.e. number of vertices, or a matrix (end use for map creation)
    Graph.init = function(weightMatrix) {

      this.height = weightMatrix.height;
      this.width = weightMatrix.width;

      this.vertexMatrix = Object.create(Matrix).init(this.height, this.width);
      this.vertexMatrix.initGrid();
      this.vertices = [];
      this.vertexCount = 0;

      var i, j, weight, vertex, id;

      for (i = 0; i < this.width; i++) {
        for (j = 0; j < this.height; j++) {

          weight = weightMatrix.get(i, j);
          id = this.vertexCount;
          vertex = Object.create(Vertex).init(id, i, j, weight);

          this.vertexMatrix.set(i, j, vertex);
          this.vertices[id] = vertex;
          this.vertexCount++;

        }
      }

      var k, move, neighbor;

      for (i = 0; i < this.width; i++) {
        for (j = 0; j < this.height; j++) {

          vertex = this.vertexMatrix.get(i, j);

          for (k = 0; k < ADJACENT.length; k++) {
            move = ADJACENT[k];

            if (this.vertexMatrix.isValidCoordinate(i + move[0], j + move[1])) {
              neighbor = this.vertexMatrix.get(i + move[0], j + move[1]);
              vertex.neighbors.push(neighbor);
            }
          }

        }
      }

      return this;
    };

    //TODO: redo all the function signatures
    Graph.adjacent = function(x, y) {
      return x.neighbors.indexOf(y) !== -1;
    };

    Graph.getEdgeValue = function(x, y) {
      //return (x.weight + y.weight) / 2;
      return Math.max(x.weight, y.weight);
    };

    Graph.getVertex = function(x, y) {
      return this.vertexMatrix.get(x, y);
    };

    module.Graph = Graph;
    module.Vertex = Vertex;

    return module;

  })(VAGABOND.GRAPH);
})();
