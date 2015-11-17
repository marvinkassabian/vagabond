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

    // TODO: clean this up, clean all of this up
    Controller.processInput = function(screen, avatar, level) {
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

        if (move && move.entity.isValidMove(move.dx, move.dy, level)) {
          move.entity.move(move.dx, move.dy);
        }

        if (event === "click") {
          var clickCoordinate = {
            x: eventBlob.coordinate.x,
            y: eventBlob.coordinate.y
          };

          // TODO: sort entities by health
          // TODO: eventually allow player to choose which entity to attack
          var entity = level.getEntitiesAt(clickCoordinate)[0];

          if (entity !== undefined) {
            if (UTIL.manhattanDistance(avatar, entity) === 1 && entity.hp > 0) {
              avatar.attack(entity);
              eventBlob.useTurn = true;
            }
          }
        }

        if ((move && move.useTurn) || eventBlob.useTurn) {
          level.takeTurn();
        }

        if (DEBUG) {
          debugMapTesting(event, level);
        }

        if (eventBlob.render) {
          level.renderTo(screen);
          screen.renderToElement(document.body.getElementsByClassName("map")[0]);
          Object.create(VAGABOND.CONTROLS.MapListener).init(this.listener);
        }
      }
    };

    // START DEBUG / TEST CODE

    function debugMapTesting(event, level) {
      var map = level.map;
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
    }

    // END DEBUG / TEST CODE

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLS);
})();
