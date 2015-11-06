(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  VAGABOND.CONTROLS = (function(module) {

    var MAP_MODES = VAGABOND.MAPS.MAP_MODES;
    var ALGORITHMS = VAGABOND.ALGORITHMS;

    var Controller = {};

    Controller.init = function(listener) {
      this.listener = listener;

      return this;
    };

    Controller.processInput = function(screen, avatar, map, level) {
      if (this.listener.eventStack.length > 0) {

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

        var mapMode = MAP_MODES.MapModes[map.mapType];

        if (event === "algorithm") {
          mapMode.generate.bind(null, map).apply(null, mapMode.algorithmArgs);
        } else if (event === "diamondSquare") {
          ALGORITHMS.diamondSquare(map, 30);
        } else if (event === "cellularAutomata") {
          ALGORITHMS.cellularAutomata(map, 1);
        } else if (event === "initMap") {
          map.initGrid();
        } else if (event === "switchMapType") {
          var currentMapModeIndex = MAP_MODES.MapModeNames.indexOf(map.mapType);
          var nextMapModeIndex = UTIL.wrap(currentMapModeIndex + 1, 0, MAP_MODES.MapModeNames.length);
          map.setType(MAP_MODES.MapModeNames[nextMapModeIndex]);
          //this.listener.eventStack.unshift({state: "initMap", render: true});
        }

        if (eventBlob.render) {
          level.renderTo(screen);
          screen.renderToElement(document.body);
        }
      }
    };

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLS);
})();
