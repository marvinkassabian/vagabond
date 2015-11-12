(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.GRAPH");

  VAGABOND.GRAPH = (function(module) {

    var Vertex = {};

    //TODO: do something cleaner / more informative than 'data'
    Vertex.init = function(vertexNumber, data) {
      this.vertexNumber = vertexNumber;
      this.data = data;
    };

    var Matrix = VAGABOND.MATRIX.Matrix;

    var Graph = {};

    //TODO: all for different init functions
    //      i.e. number of vertices, or a matrix (end use for map creation)
    Graph.init = function(vertexCount, options) {
      var i;

      //TODO: decouple inner data structure from graph object.
      this.adjacencyMatrix = Object.create(Matrix).init(vertexCount, vertexCount);
      this.vertices = {};
      this.edges = {};
      this.vertexCount = 0;
      this.edgeCount = 0;

      for (i = 0; i < vertexCount; i++) {
        this.vertices[i] = {
          vertexNumber: i,
          data: {}
        };
        this.vertexCount++;
      }
    };

    Graph.adjacent = function(x, y) {
      return !!this.adjacencyMatrix.get(x.vertexNumber, y.vertexNumber);
    };

    Graph.neighbors = function(x) {
      var i;
      var ret = [];

      for (i = 0; i < this.vertexCount; i++) {
        if (this.adjacencyMatrix.get(x.vertexNumber, i) !== undefined) {
          ret.push(this.vertices[i]);
        }
      }

      return ret;
    };

    Graph.addVertex = function(x) {

    };

    Graph.removeVertex = function(x) {

    };

    Graph.addEdge = function(x, y) {

    };

    Graph.removeEdge = function(x, y) {

    };

    Graph.getVertexValue = function(x) {

    };

    Graph.setVertexValue = function(x, v) {

    };

    Graph.getEdgeValue = function(x, y) {

    };

    Graph.setEdgeValue = function(x, y, v) {

    };

    module.Graph = Graph;

    return module;

  })(VAGABOND.GRAPH);
})();
