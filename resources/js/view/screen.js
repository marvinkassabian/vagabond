(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.SCREEN");

  VAGABOND.SCREEN = (function(module) {

    var Matrix = VAGABOND.DATA_STRUCTURES.MATRIX.Matrix;

    var Screen = Object.create(Matrix);

    Screen.init = function(height, width, x, y) {
      this.originX = x;
      this.originY = y;
      Matrix.init.call(this, height, width, {
        initValue: function() {
          return " ";
        }
      }).initGrid();

      return this;
    };

    // TODO: do something with this and Matrix.initGrid
    Screen.clear = Matrix.initGrid;

    Screen.move = function(dx, dy) {
      this.originX += dx;
      this.originY += dy;
    };

    Screen.isValidMove = function(dx, dy, level) {
      var map = level.map;
      var newX = this.originX + dx;
      var newY = this.originY + dy;

      return map.isValidCoordinate(newX + this.width - 1, newY + this.height - 1) &&
          map.isValidCoordinate(newX + this.width - 1, newY) &&
          map.isValidCoordinate(newX, newY + this.height - 1) &&
          map.isValidCoordinate(newX, newY);
    };

    Screen.getOrigin = function() {
      return {
        x: this.originX,
        y: this.originY
      };
    };

    // TODO: decouple from screen, and into parent object for both screen
    //       and other user interface objects.
    //       well, put method signature in at least for duck typing.
    Screen.toElement = function(options) {
      // TODO: change map variable to screen, do in other relevent places too.
      var i, j, map, tileElement, value;

      options = UTIL.extend(options, {
        formatValue: function(value) {
          return value;
        },

        formatElement: function(value, x, y) {
          var offset = this.getOrigin();

          var tileElement = document.createElement("span");
          tileElement.className = "tile tile-" + ((value === " ") ? "SPACE" : value);
          tileElement.dataset.x = (x + offset.x);
          tileElement.dataset.y = (y + offset.y);

          tileElement.innerHTML = value;

          return tileElement;
        }
      });

      map = document.createElement("div");
      map.className = "screen";

      for (i = 0; i < this.height; i++) {
        for (j = 0; j < this.width; j++) {
          value = options.formatValue.call(this, this.get(j, i), j, i);
          tileElement = options.formatElement.call(this, value, j, i);

          map.appendChild(tileElement);
        }

        map.appendChild(document.createElement("br"));
      }

      return map;
    };

    // TODO: decouple from screen, and into parent object for both screen
    //       and other interface objects.
    Screen.renderToElement = function(element) {
      var screenElement = this.toElement();

      element.innerHTML = screenElement.innerHTML;
    };

    module.Screen = Screen;

    return module;

  })(VAGABOND.SCREEN);
})();
