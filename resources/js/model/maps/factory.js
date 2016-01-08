"use strict";

// TODO: figure out proper conventions for factory pattern in JavaScript

var merge = require("lodash.merge");
var clamp = require("clamp");
var random = require("random-js")();
var Map = require("./map");
var cellularAutomata = require("../../algorithms/cellularautomata");
var diamondSquare = require("../../algorithms/diamondsquare");

var createHeightMap = function(size, options) {

  options = merge({}, {
    formatValue: function(value) {
      return Math.floor(clamp(value, 0, 31)).toString(32);
    },
    initValue: function() {
      return random.real(1, 7);
    }
  }, options);

  var heightMap = Object.create(Map).init(size, size, options);

  // TODO: figure out some way so that this doesn't need to be defined each
  //       call, probably have it saved as a module variable. Think of
  //       something cleaner.
  heightMap.generate = function() {
    this.initGrid();
    diamondSquare(this, 60);
    this.initGrid((function(x, y) {
      return Math.max(Math.floor(this.get(x, y)), 1);
    }).bind(this));
  };

  heightMap.type = "height";

  return heightMap;

};

// it's (2 ^ 16) - 1
// i.e. random large value
var WALL_WEIGHT = 32767;
var FLOOR_WEIGHT = 1;

var createDungeonMap = function(height, width, options) {
  options = merge({}, {
    formatValue: function(value) {
      if (value === WALL_WEIGHT) {
        return "O";
      } else if (value === FLOOR_WEIGHT) {
        return ".";
      } else {
        return " ";
      }
    },
    initValue: function() {
      return Math.random() < 0.4 ? WALL_WEIGHT : FLOOR_WEIGHT;
    }
  }, options);

  var dungeonMap = Object.create(Map).init(height, width, options);

  // TODO: figure out some way so that this doesn't need to be defined each
  //       call, probably have it saved as a module variable. Think of
  //       something cleaner.
  dungeonMap.generate = function() {
    this.initGrid();
    cellularAutomata(this, 3, function(maxCell, counters) {
      return counters[WALL_WEIGHT] === undefined ? WALL_WEIGHT : maxCell;
    });

    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {

        // west and east exit
        if ((i >= 0 && i < 4) || (i >= this.width - 4 && i < this.width)) {
          if (j >= this.height / 2 - 4 && j <= this.height / 2 + 4) {
            this.set(i, j, FLOOR_WEIGHT);
          } else {
            this.set(i, j, WALL_WEIGHT);
          }
        }

        // north and south exit
        if ((j >= 0 && j < 4) || (j >= this.height - 4 && j < this.height)) {
          if (i >= this.width / 2 - 4 && i <= this.width / 2 + 4) {
            this.set(i, j, FLOOR_WEIGHT);
          } else {
            this.set(i, j, WALL_WEIGHT);
          }
        }
      }
    }

    cellularAutomata(this, 7);
  };

  dungeonMap.type = "dungeon";

  return dungeonMap;
};

exports.createHeightMap = createHeightMap;
exports.createDungeonMap = createDungeonMap;
exports.WALL_WEIGHT = WALL_WEIGHT;
