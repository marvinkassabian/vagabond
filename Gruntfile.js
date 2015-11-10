// jscs:disable
module.exports = function(grunt) {
  "use strict";

  var utilFiles = [
    "resources/js/util/util.js",
    "resources/js/util/virtualkeys.js"
  ];
  var vagabondFiles = [
    "resources/js/vagabond.js",
    "resources/js/matrix.js",
    "resources/js/algorithms.js",
    "resources/js/maps/mapmodes.js",
    "resources/js/maps/map.js",
    "resources/js/entities/entity.js",
    "resources/js/entities/killableentity.js",
    "resources/js/entities/movablekillableentity.js",
    "resources/js/entities/monster.js",
    "resources/js/entities/enemies/goblin.js",
    "resources/js/maps/factory.js",
    "resources/js/controls/listener.js",
    "resources/js/controls/controller.js",
    "resources/js/screen.js",
    "resources/js/level.js",
    "resources/js/main.js"
  ];

  // Project configuration.
  grunt.initConfig({
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(path) {
          return path + ".map";
        }
      },
      util: {
        files: {
          "util.min.js": utilFiles,
          "../marvinkassabian.github.io/util.min.js": utilFiles
        }
      },
      vagabond: {
        files: {
          "vagabond.min.js": vagabondFiles,
          "../marvinkassabian.github.io/vagabond.min.js": vagabondFiles
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["util", "vagabond"]);
  grunt.registerTask("vagabond", ["uglify:vagabond"]);
  grunt.registerTask("util", ["uglify:util"]);

};
