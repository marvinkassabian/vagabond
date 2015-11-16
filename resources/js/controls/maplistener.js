(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  // TODO: reorganize listener hierarchy
  VAGABOND.CONTROLS = (function(module) {

    var MapListener = {};

    // TODO: make it so that this doesn't need to get called each move
    MapListener.init = function() {

      var tiles = document.getElementsByClassName("tile");

      for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        tile.addEventListener("click", writeToLog.bind(this, tile), false);
      }

      function writeToLog(tile) {
        VAGABOND.writeToLog(tile.dataset.coordinate);
      }

      return this;
    };

    module.MapListener = MapListener;

    return module;

  })(VAGABOND.CONTROLS);

})();
