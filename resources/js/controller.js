(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER");

  VAGABOND.CONTROLLER = (function(module) {

    var Controller = {};

    Controller.init = function(controls) {
      this.controls = controls;

      return this;
    };

    Controller.processInput = function(screen, avatar, map, level) {
      if (this.controls.eventStack.length > 0) {

        var event = this.controls.eventStack.pop();

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

        if (event === "normalize") {
          VAGABOND.ALGORITHMS.cellularAutomata(map, 1);
        }

        level.renderTo(screen);
        screen.renderToElement(document.body);
      }
    };

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLLER);
})();
