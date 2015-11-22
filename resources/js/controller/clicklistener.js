(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER");

  // TODO: reorganize listener hierarchy
  VAGABOND.CONTROLLER = (function(module) {

    var ClickListener = {};

    var eventStack = VAGABOND.CONTROLLER.EVENT_STACK.getEventStack();

    // TODO: make it so that this doesn't need to get called each move
    ClickListener.init = function() {

      this.tileMap = {};

      this.setupTileListeners();
      this.setupLogListeners();

      return this;
    };

    ClickListener.setupLogListeners = function() {
      var logs = document.getElementsByClassName("log");

      for (var i = 0; i < logs.length; i++) {
        var log = logs[i];

        log.addEventListener("click", handleClickEvent.bind(null, log), false);
      }

      function handleClickEvent(log) {
        var id = log.dataset.id;

        eventStack.addEvent({
          state: "clickLog",
          render: true,
          useTurn: false,
          data: {
            id: id
          }
        });
      }
    };

    ClickListener.setupTileListeners = function() {
      var tiles = document.getElementsByClassName("tile");

      for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        tile.addEventListener("click", handleClickEvent.bind(null, tile), false);
        this.tileMap[tile.dataset.x + ":" + tile.dataset.y] = tile;
      }

      function handleClickEvent(tile) {
        var coordinate = {
          x: parseInt(tile.dataset.x),
          y: parseInt(tile.dataset.y)
        };

        eventStack.addEvent({
          state: "clickTile",
          render: true,
          useTurn: false,
          data: {
            coordinate: coordinate
          }
        });
      }
    };

    // TODO: move this out of the ClickListener module, maybe into screen
    ClickListener.getTile = function(x, y) {
      return this.tileMap[x + ":" + y];
    };

    module.ClickListener = ClickListener;

    return module;

  })(VAGABOND.CONTROLLER);

})();
