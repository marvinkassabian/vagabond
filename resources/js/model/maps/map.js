(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.MAPS");

  VAGABOND.MODEL.MAPS = (function(module) {

    var Matrix = VAGABOND.DATA_STRUCTURES.Matrix;
    var Graph = VAGABOND.DATA_STRUCTURES.Graph;

    var Map = Object.create(Matrix);

    Map.init = function(h, w, defaults) {
      Matrix.init.call(this, h, w, defaults);

      // TODO: probably just mix graph and map together
      this.graph = Object.create(Graph);

      return this;
    };

    Map.initGrid = function(initValueFunc) {
      Matrix.initGrid.call(this, initValueFunc);

      this.graph.init(this);
    };

    Map.renderTo = function(screen, formatValue) {
      var i, j, offset;

      if (formatValue === undefined) {
        formatValue = this.defaults.formatValue;
      }

      offset = screen.getOrigin();

      for (i = offset.y; i < screen.height + offset.y; i++) {
        for (j = offset.x; j < screen.width + offset.x; j++) {

          if (this.isValidCoordinate(j, i)) {
            screen.set(j - offset.x, i - offset.y,
                formatValue.call(this, this.get(j, i), j, i));
          }
        }
      }

    };

    Map.generate = function() {

    };

    // TODO: clean this, it is painfully slow
    // HACK: this code needs to get either refactored, or removed
    Map.getPossibleMoves = function(entity) {
      var ret = [];
      var added = {};

      flood(entity.movement, entity, this);

      return ret;

      function flood(movesLeft, coor, map) {
        var VALID_MOVES = UTIL.VALID_MOVES;
        var move, i, nextCoor, nextMovesLeft;

        if (added[coor.x + ":" + coor.y] >= movesLeft) {
          return;
        } else if (movesLeft > 0) {
          if (added[coor.x + ":" + coor.y] === undefined) {
            ret.push(coor);
          }

          added[coor.x + ":" + coor.y] = movesLeft;

          for (i = 0; i < VALID_MOVES.length; i++) {
            move = VALID_MOVES[i];
            nextCoor = {
              x: coor.x + move[0],
              y: coor.y + move[1]
            };

            if (map.isValidCoordinate(nextCoor.x, nextCoor.y)) {
              nextMovesLeft = movesLeft - map.graph.getEdgeValue(coor, nextCoor);
              flood(nextMovesLeft, nextCoor, map);
            }
          }

        }
      }
    };

    module.Map = Map;

    return module;

  })(VAGABOND.MODEL.MAPS);
})();
