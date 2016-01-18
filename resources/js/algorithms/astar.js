"use strict";

const d = require("distance-calc");

const aStar = function aStar(graph, startCoor, endCoor, givenHeuristic) {
  const heuristic = givenHeuristic || ((origin, destination) => {
    return d.norm([origin.x, origin.y], [destination.x, destination.y], 2);
  });

  const dirtyVertices = [];
  const remaining = [];

  for (const vertexID in graph.vertices) {
    if (graph.vertices.hasOwnProperty(vertexID)) {
      const vertex = cleanVertex(graph.vertices[vertexID]);
      if (vertex.x === startCoor.x && vertex.y === startCoor.y) {
        vertex.pathWeight = 0;
      }

      remaining.push(vertex);
    }
  }

  let found = false;

  while (!found && remaining.length !== 0) {
    remaining.sort((a, b) => {
      return (a.getTotal() - b.getTotal()) * -1;
    });

    const vertex = remaining.pop();
    dirtyVertices.push(vertex);

    for (let i = 0; i < vertex.neighbors.length; i++) {
      const neighbor = vertex.neighbors[i];
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
    const cleanedVertex = vertex;
    cleanedVertex.pathWeight = Infinity;
    cleanedVertex.heuristic = heuristic(cleanedVertex, endCoor);
    cleanedVertex.getTotal = function getTotal() {
      return this.pathWeight + this.heuristic;
    };

    cleanedVertex.previousVertex = undefined;

    return cleanedVertex;
  }

  function toMoveArray(vertex) {
    const ret = [];
    let current = vertex;

    while (current.previousVertex !== undefined) {
      const previous = current.previousVertex;
      ret.unshift({ dx: current.x - previous.x, dy: current.y - previous.y });
      current = previous;
    }

    return ret;
  }
};

module.exports = aStar;
