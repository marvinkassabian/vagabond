(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.SCREEN");

  VAGABOND.SCREEN = (function(module) {

    var Matrix = VAGABOND.MATRIX.Matrix;

    var Screen = Object.create(Matrix);

    Screen.init = function(height, width, x, y) {
      this.originX = x;
      this.originY = y;
      Matrix.init.call(this, height, width, function() {
        return " ";
      }).initGrid();

      return this;
    };

    //TODO: do something with this and Matrix.initGrid
    Screen.clear = Screen.initGrid;

    Screen.move = function(dx, dy) {
      this.originX += dx;
      this.originY += dy;
    };

    Screen.isValidMove = function(dx, dy, map) {
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

    Screen.toHTML = function(options) {
      var i;
      var j;
      var map;
      var tileElement;
      var value;

      options = UTIL.extend(options, {
        formatValue: function(value) {
          return value;
        },

        formatElement: function(value) {
          var tileElement = document.createElement("span");
          tileElement.className = "tile-" + value;
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

    Screen.renderToElement = function(element) {
      var screenHTML = this.toHTML();

      element.replaceChild(screenHTML, element.firstChild);
    };

    module.Screen = Screen;

    return module;

  })(VAGABOND.SCREEN);
})();
