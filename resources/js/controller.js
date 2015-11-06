(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  VAGABOND.CONTROLS = (function(module) {

    var MAP_MODES = VAGABOND.MAPS.MAP_MODES;

    var Controller = {};

    Controller.init = function(listener) {
      this.listener = listener;

      return this;
    };

    Controller.processInput = function(screen, avatar, map, level) {
      if (this.listener.eventStack.length > 0) {

        var event = this.listener.eventStack.pop();

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

        var mapMode = MAP_MODES[map.mapModeIndex];

        if (event === "algorithm") {
          mapMode.algorithm(map, mapMode.algorithmArg);
        } else if (event === "initMap") {
          map.initGrid();
        } else if (event === "switchMapType") {
          map.mapModeIndex = UTIL.wrap(map.mapModeIndex + 1, 0, MAP_MODES.length);
          mapMode = MAP_MODES[map.mapModeIndex];

          map.setDefaults({
            initValue: mapMode.initValue,
            formatValue: mapMode.formatValue
          });
        }

        level.renderTo(screen);
        screen.renderToElement(document.body);
      }
    };

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLS);
})();
