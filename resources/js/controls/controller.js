(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  VAGABOND.CONTROLS = (function(module) {

    var MAP_FACTORY = VAGABOND.MAPS.FACTORY;
    var MapListener = VAGABOND.CONTROLS.MapListener;

    var Controller = {};

    Controller.init = function(listener) {
      this.listener = listener;

      return this;
    };

    // TODO: clean this up, clean all of this up
    Controller.processInput = function(screen, avatar, level, info) {
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
          var entity = level.getEntitiesAt(clickCoordinate).sort(function(a, b) {
            return b.hp - a.hp;
          })[0];

          if (entity !== undefined) {

            info.init(entity);

            if (UTIL.manhattanDistance(avatar, entity) === 1 && entity.hp > 0) {
              avatar.attack(entity);
              eventBlob.useTurn = true;
            }
          } else {
            info.init(avatar);
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
          Object.create(MapListener).init(this.listener);
          info.renderToElement(document.body.getElementsByClassName("selected-info")[0]);
        }
      }
    };

    // START DEBUG CODE

    function debugMapTesting(event, level) {
      var map = level.map;
      if (event === "generate") {
        map.generate();
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

    // END DEBUG CODE

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLS);
})();
