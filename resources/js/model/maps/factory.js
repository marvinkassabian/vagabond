(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.MAPS.FACTORY");

  // TODO: figure out proper conventions for factory pattern in JavaScript
  VAGABOND.MODEL.MAPS.FACTORY = (function(module) {

    var Map = VAGABOND.MODEL.MAPS.Map;
    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var createHeightMap = function(size, options) {

      options = UTIL.extend(options, {
        formatValue: function(value) {
          return Math.floor(UTIL.clamp(value, 0, 31)).toString(32);
        },
        initValue: function() {
          return UTIL.random(6, 26);
        }
      });

      var heightMap = Object.create(Map).init(size, size, options);

      // TODO: figure out some way so that this doesn't need to be defined each
      //       call, probably have it saved as a module variable. Think of
      //       something cleaner.
      heightMap.generate = function() {
        this.initGrid();
        ALGORITHMS.diamondSquare(this, 30);
      };

      heightMap.type = "height";

      return heightMap;

    };

    // it's (2 ^ 16) - 1
    // i.e. random large value
    var WALL_WEIGHT = 32767;

    var createDungeonMap = function(height, width, options) {
      options = UTIL.extend(options, {
        formatValue: function(value) {
          if (value === WALL_WEIGHT) {
            return "O";
          } else if (value === 1) {
            return ".";
          } else {
            return " ";
          }
        },
        initValue: function() {
          return Math.random() < 0.45 ? WALL_WEIGHT : 1;
        }
      });

      var dungeonMap = Object.create(Map).init(height, width, options);

      // TODO: figure out some way so that this doesn't need to be defined each
      //       call, probably have it saved as a module variable. Think of
      //       something cleaner.
      dungeonMap.generate = function() {
        this.initGrid();
        ALGORITHMS.cellularAutomata(this, 8);
      };

      dungeonMap.type = "dungeon";

      return dungeonMap;
    };

    module.createHeightMap = createHeightMap;
    module.createDungeonMap = createDungeonMap;
    module.WALL_WEIGHT = WALL_WEIGHT;

    return module;

  })(VAGABOND.MODEL.MAPS.FACTORY);
})();
