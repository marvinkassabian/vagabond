"use strict";

var UTIL = require("../util/util");
var Matrix = require("./matrix");

var Vertex = {};

Vertex.init = function(id, x, y, weight) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.weight = weight;
  this.neighbors = [];
  // TODO: use this at some point
  this.entities = [];

  return this;
};

var Graph = {};

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

      for (k = 0; k < UTIL.VALID_MOVES.length; k++) {
        move = UTIL.VALID_MOVES[k];

        if (this.vertexMatrix.isValidCoordinate(i + move[0], j + move[1])) {
          neighbor = this.vertexMatrix.get(i + move[0], j + move[1]);
          vertex.neighbors.push(neighbor);
        }
      }

    }
  }

  return this;
};

Graph.adjacent = function(origin, destination) {
  return origin.neighbors.indexOf(destination) !== -1;
};

Graph.getEdgeValue = function(origin, destination) {
  origin = this.getVertex(origin);
  destination = this.getVertex(destination);

  // HACK: just so that if spawned in wall, can walk out of it
  return destination.weight / Math.min(origin.weight, destination.weight) * UTIL.distance(origin, destination, 2);
  // return Math.max(origin.weight, destination.weight) * UTIL.distance(origin, destination, 2);
};

Graph.getVertex = function(coordinate) {
  return this.vertexMatrix.get(coordinate.x, coordinate.y);
};

Graph.setVertex = function(coordinate, vertex) {
  return this.vertexMatrix.set(coordinate.x, coordinate.y, vertex);
};

module.exports = Graph;
