(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS.FACTORY");

  VAGABOND.MAPS.FACTORY = (function(module) {

    var Map = VAGABOND.MAPS.Map;
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

      //TODO: figure out some way so that this doesn't need to be defined each
      //      call, probably have it saved as a module variable. Think of
      //      something cleaner.
      heightMap.generate = function() {
        this.initGrid();
        ALGORITHMS.diamondSquare(this, 30);
      };

      heightMap.type = "height";

      return heightMap;

    };

    var createDungeonMap = function(height, width, options) {
      options = UTIL.extend(options, {
        formatValue: function(value) {
          return value ? "0" : "O";
        },
        initValue: function() {
          return Math.random() > 0.5 ? 1 : 0;
        }
      });

      var dungeonMap = Object.create(Map).init(height, width, options);

      //TODO: figure out some way so that this doesn't need to be defined each
      //      call, probably have it saved as a module variable. Think of
      //      something cleaner.
      dungeonMap.generate = function() {
        this.initGrid();
        ALGORITHMS.cellularAutomata(this, 5);
      };

      dungeonMap.type = "dungeon";

      return dungeonMap;
    };

    module.createHeightMap = createHeightMap;
    module.createDungeonMap = createDungeonMap;

    return module;

  })(VAGABOND.MAPS.FACTORY);
})();
