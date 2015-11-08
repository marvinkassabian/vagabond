(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  VAGABOND.CONTROLS = (function(module) {

    var ALGORITHMS = VAGABOND.ALGORITHMS;
    var MAP_FACTORY = VAGABOND.MAPS.FACTORY;

    var Controller = {};

    Controller.init = function(listener) {
      this.listener = listener;

      return this;
    };

    //TODO: clean this up, clean all of this up
    Controller.processInput = function(screen, avatar, level) {
      if (this.listener.eventStack.length > 0) {

        var map = level.map;

        var eventBlob = this.listener.eventStack.pop();
        var event = eventBlob.state;

        var moves = {
          screenUp: {dx: 0, dy: -1, entity: screen, useTurn: false},
          screenDown: {dx: 0, dy: 1, entity: screen, useTurn: false},
          screenLeft: {dx: -1, dy: 0, entity: screen, useTurn: false},
          screenRight: {dx: 1, dy: 0, entity: screen, useTurn: false},
          charUp: {dx: 0, dy: -1, entity: avatar, useTurn: true},
          charDown: {dx: 0, dy: 1, entity: avatar, useTurn: true},
          charLeft: {dx: -1, dy: 0, entity: avatar, useTurn: true},
          charRight: {dx: 1, dy: 0, entity: avatar, useTurn: true}
        };

        var move = moves[event];

        if (move && move.entity.isValidMove(move.dx, move.dy, map)) {
          move.entity.move(move.dx, move.dy);
        }

        if (move && move.useTurn) {
          level.takeTurn();
        }

        // START DEBUG / TEST CODE

        if (event === "generate") {
          map.generate();
        } else if (event === "diamondSquare") {
          ALGORITHMS.diamondSquare(map, 30);
        } else if (event === "cellularAutomata") {
          ALGORITHMS.cellularAutomata(map, 1);
        } else if (event === "initMap") {
          map.initGrid();
        } else if (event === "switchMapType") {
          if (map.type === "height") {
            level.map = MAP_FACTORY.createDungeonMap(129, 129);
          } else {
            level.map = MAP_FACTORY.createHeightMap(129);
          }

          level.map.initGrid();
        }

        // END DEBUG / TEST CODE

        if (eventBlob.render) {
          level.renderTo(screen);
          screen.renderToElement(document.body.getElementsByClassName("map")[0]);
        }
      }
    };

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLS);
})();
