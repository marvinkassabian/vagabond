"use strict";

var UTIL = require("../util/util");

var aStar = function(graph, startCoor, endCoor, heuristic) {
  heuristic = heuristic || function(origin, destination) {
    return UTIL.manhattanDistance(origin, destination);
  };

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

  return toMoveArray(graph.getVertex(endCoor));

  function cleanVertex(vertex) {
    vertex.pathWeight = Infinity;
    vertex.heuristic = heuristic(vertex, endCoor);
    vertex.getTotal = function() {
      return this.pathWeight + this.heuristic;
    };

    vertex.previousVertex = undefined;

    return vertex;
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

module.exports = aStar;
