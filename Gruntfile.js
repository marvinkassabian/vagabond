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
    "resources/js/algorithms.js",
    "resources/js/maps/mapmodes.js",
    "resources/js/maps/map.js",
    "resources/js/maps/factory.js",
    "resources/js/entities/entity.js",
    "resources/js/entities/killableentity.js",
    "resources/js/entities/movablekillableentity.js",
    "resources/js/entities/monster.js",
    "resources/js/entities/enemies/goblin.js",
    "resources/js/entities/playerentity.js",
    "resources/js/interface/information.js",
    "resources/js/controls/listener.js",
    "resources/js/controls/maplistener.js",
    "resources/js/controls/controller.js",
    "resources/js/screen.js",
    "resources/js/level.js",
    "resources/js/main.js"
  ];

  var utilOutputs = {
    "util.min.js": utilFiles,
    "../marvinkassabian.github.io/vagabond/util.min.js": utilFiles
  };
  var vagabondOutputs = {
    "vagabond.min.js": vagabondFiles,
    "../marvinkassabian.github.io/vagabond/vagabond.min.js": vagabondFiles
  };

  // Project configuration.
  grunt.initConfig({
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(path) {
          return path + ".map";
        },
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        }
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
          compress: {
            global_defs: {
              "DEBUG": true
            }
          }
        }
      },
      vagabond_DEBUG: {
        files: vagabondOutputs,
        options: {
          compress: {
            global_defs: {
              "DEBUG": true
            }
          }
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
