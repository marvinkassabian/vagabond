(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  // TODO: reorganize listener hierarchy
  VAGABOND.CONTROLS = (function(module) {

    var MapListener = {};

    // TODO: make it so that this doesn't need to get called each move
    MapListener.init = function(listener) {

      var tiles = document.getElementsByClassName("tile");

      for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        tile.addEventListener("click", handleClickEvent.bind(this, tile), false);
      }

      function handleClickEvent(tile) {
        var coordinate = {
          x: parseInt(tile.dataset.x),
          y: parseInt(tile.dataset.y)
        };

        listener.addToEventStack({
          state: "click",
          render: true,
          useTurn: false,
          coordinate: coordinate
        });
      }

      return this;
    };

    module.MapListener = MapListener;

    return module;

  })(VAGABOND.CONTROLS);

})();
