(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.SCREEN');

  VAGABOND.SCREEN = (function(module) {

    var Map = VAGABOND.MAPS.Map;

    var Screen = Object.create(Map);

    var initProto = Map.init;

    Screen.init = function(height, width, x, y) {
      this.originX = x;
      this.originY = y;
      initProto.call(this, height, width, function() {
        return ' ';
      });

      return this;
    };

    Screen.clear = function() {
      this.initGrid(function() {
        return ' ';
      });
    };

    Screen.move = function(dx, dy) {
      this.originX += dx;
      this.originY += dy;
    };

    Screen.getOffset = function() {
      return {
        x: this.originX - Math.floor(this.width / 2),
        y: this.originY - Math.floor(this.height / 2)
      };
    };

    Screen.toHTML = function(options) {
      var i, j, map, tileElement, value;
      options = UTIL.extend(options, {
        formatValue: function(value) {
          return value;
        },
        formatElement: function(value) {
          var tileElement = document.createElement('span');
          tileElement.className = 'tile-' + value;
          tileElement.innerHTML = value;

          return tileElement;
        }
      });

      map = document.createElement('div');
      map.className = 'map';

      for (i = 0; i < this.height; i++) {
        for (j = 0; j < this.width; j++) {
          value = options.formatValue.call(this, this.get(j, i), j, i);
          tileElement = options.formatElement.call(this, value, j, i);

          map.appendChild(tileElement);
        }
        map.appendChild(document.createElement('br'));
      }

      return map;
    };

    module.Screen = Screen;

    return module;

  })(VAGABOND.SCREEN);
})();
