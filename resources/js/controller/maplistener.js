(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER");

  // TODO: reorganize listener hierarchy
  VAGABOND.CONTROLLER = (function(module) {

    var MapListener = {};

    var eventStack = VAGABOND.CONTROLLER.EVENT_STACK.getEventStack();

    // TODO: make it so that this doesn't need to get called each move
    MapListener.init = function() {

      var tiles = document.getElementsByClassName("tile");
      this.tileMap = {};

      for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        tile.addEventListener("click", handleClickEvent.bind(this, tile), false);
        this.tileMap[tile.dataset.x + ":" + tile.dataset.y] = tile;
      }

      function handleClickEvent(tile) {
        var coordinate = {
          x: parseInt(tile.dataset.x),
          y: parseInt(tile.dataset.y)
        };

        eventStack.add({
          state: "click",
          render: true,
          useTurn: false,
          coordinate: coordinate
        });
      }

      return this;
    };

    MapListener.getTile = function(x, y) {
      return this.tileMap[x + ":" + y];
    };

    module.MapListener = MapListener;

    return module;

  })(VAGABOND.CONTROLLER);

})();
