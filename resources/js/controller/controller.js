(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER");

  VAGABOND.CONTROLLER = (function(module) {

    var MAP_FACTORY = VAGABOND.MODEL.MAPS.FACTORY;
    var MapListener = VAGABOND.CONTROLLER.MapListener;
    var eventStack = VAGABOND.CONTROLLER.EventStack.getEventStack();

    var Controller = {};

    Controller.init = function(listener) {
      this.listener = listener;

      return this;
    };

    // TODO: clean this up, clean all of this up
    Controller.processInput = function(screen, avatar, level, info, logger) {
      if (eventStack.size() > 0) {

        var eventBlob = eventStack.pop();
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
          handleClick(level, info, avatar, eventBlob);
        }

        handleLogger(logger, eventBlob);

        if ((move && move.useTurn) || eventBlob.useTurn) {
          level.takeTurn();
        }

        if (DEBUG) {
          debugMapTesting(event, level);
        }

        if (eventBlob.render) {
          level.renderTo(screen);
          screen.renderToElement(document.body.getElementsByClassName("map")[0]);
          var mapListener = Object.create(MapListener).init();

          colorPossibleMoveTiles(level, mapListener);

          info.renderToElement(document.body.getElementsByClassName("selected-info")[0]);
          logger.renderToElement(document.body.getElementsByClassName("logs")[0]);
        }
      }
    };

    function handleLogger(logger, eventBlob) {
      var event = eventBlob.state;

      if (event === "logDown") {
        logger.offset = Math.min(logger.offset + 1, Math.max(logger.logs.length - 1, 0));
      } else if (event === "logUp") {
        logger.offset = Math.max(logger.offset - 1, 0);
      }
    }

    function handleClick(level, info, avatar, eventBlob) {
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

    // TODO: clean this
    function colorPossibleMoveTiles(level, mapListener) {
      var possibleMoves = level.map.getPossibleMoves(level.player);

      for (var i = 0; i < possibleMoves.length; i++) {
        var possibleMove = possibleMoves[i];
        // TODO: needs to check to see if map coor is valid on the screen
        (mapListener.getTile(possibleMove.x, possibleMove.y) || {}).className += " possible";
      }
    }

    // START DEBUG CODE

    function debugMapTesting(event, level) {
      var map = level.map;
      if (event === "generate") {
        map.generate();
      } else if (event === "initMap") {
        map.initGrid();
      } else if (event === "switchMapType") {
        var nextDimension = Math.max(map.width, map.height);

        if (map.type === "height") {
          level.map = MAP_FACTORY.createDungeonMap(nextDimension, nextDimension);
        } else {
          level.map = MAP_FACTORY.createHeightMap(nextDimension);
        }

        level.map.initGrid();
      }
    }

    // END DEBUG CODE

    module.Controller = Controller;

    return module;

  })(VAGABOND.CONTROLLER);
})();
