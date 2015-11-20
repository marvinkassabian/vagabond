// jscs:disable
module.exports = function(grunt) {
  "use strict";

  var utilFiles = [
    "resources/js/util/util.js",
    "resources/js/util/virtualkeys.js"
  ];
  var vagabondFiles = [
    "resources/js/vagabond.js",
    "resources/js/datastructures/matrix.js",
    "resources/js/datastructures/graph.js",
    "resources/js/algorithms/astar.js",
    "resources/js/algorithms/cellularautomata.js",
    "resources/js/algorithms/diamondsquare.js",
    "resources/js/view/view.js",
    "resources/js/view/logger.js",
    "resources/js/model/maps/map.js",
    "resources/js/model/maps/factory.js",
    "resources/js/model/entities/entity.js",
    "resources/js/model/entities/killableentity.js",
    "resources/js/model/entities/movablekillableentity.js",
    "resources/js/model/entities/monster.js",
    "resources/js/model/entities/enemies/goblin.js",
    "resources/js/model/entities/playerentity.js",
    "resources/js/view/information.js",
    "resources/js/controller/eventstack.js",
    "resources/js/controller/keylistener.js",
    "resources/js/controller/maplistener.js",
    "resources/js/controller/controller.js",
    "resources/js/view/screen.js",
    "resources/js/model/level.js",
    "resources/js/main.js"
  ];

  var utilOutputs = {
    "compiled/js/util.min.js": utilFiles,
    "../marvinkassabian.github.io/vagabond/util.min.js": utilFiles
  };
  var vagabondOutputs = {
    "compiled/js/vagabond.min.js": vagabondFiles,
    "../marvinkassabian.github.io/vagabond/vagabond.min.js": vagabondFiles
  };

  var debugOff = {
    global_defs: {
      "DEBUG": false
    },
    dead_code: true
  };

  var debugOn = {
    global_defs: {
      "DEBUG": true
    }
  };

  // Project configuration.
  grunt.initConfig({
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(path) {
          return path + ".map";
        },
        compress: debugOff
      },
      util: {
        files: utilOutputs
      },
      vagabond: {
        files: vagabondOutputs
      },
      util_DEBUG: {
        files: utilOutputs,
        options: {
          compress: debugOn
        }
      },
      vagabond_DEBUG: {
        files: vagabondOutputs,
        options: {
          compress: debugOn
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["production"]);
  grunt.registerTask("production", ["uglify:util", "uglify:vagabond"]);
  grunt.registerTask("debug", ["uglify:util_DEBUG", "uglify:vagabond_DEBUG"]);

};
