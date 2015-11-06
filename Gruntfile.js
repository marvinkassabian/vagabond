module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target: {
        options: {
          sourceMap: true,
          sourceMapName: "vagabond.min.map"
        },
        files: {
          "util.min.js": [
            "resources/js/util/util.js",
            "resources/js/util/virtualkeys.js"
          ],
          "vagabond.min.js": [
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
            "resources/js/maps/heightmap.js",
            "resources/js/controls/listener.js",
            "resources/js/controls/controller.js",
            "resources/js/screen.js",
            "resources/js/level.js",
            "resources/js/main.js"
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["min"]);
  grunt.registerTask("min", ["uglify"]);

};
