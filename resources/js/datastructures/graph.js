(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.DATA_STRUCTURES.GRAPH");

  VAGABOND.DATA_STRUCTURES.GRAPH = (function(module) {

    var Matrix = VAGABOND.DATA_STRUCTURES.MATRIX.Matrix;

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

    var Graph = {};

    // TODO: all for different init functions
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

          for (k = 0; k < UTIL.ADJACENT.length; k++) {
            move = UTIL.ADJACENT[k];

            if (this.vertexMatrix.isValidCoordinate(i + move[0], j + move[1])) {
              neighbor = this.vertexMatrix.get(i + move[0], j + move[1]);
              vertex.neighbors.push(neighbor);
            }
          }

        }
      }

      return this;
    };

    // TODO: redo all the function signatures
    Graph.adjacent = function(x, y) {
      return x.neighbors.indexOf(y) !== -1;
    };

    Graph.getEdgeValue = function(x, y) {
      // return (x.weight + y.weight) / 2;
      return Math.max(x.weight, y.weight);
    };

    Graph.getVertex = function(x, y) {
      return this.vertexMatrix.get(x, y);
    };

    module.Graph = Graph;
    module.Vertex = Vertex;

    return module;

  })(VAGABOND.DATA_STRUCTURES.GRAPH);
})();
