(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var Matrix = VAGABOND.MATRIX.Matrix;
    var MAP_MODES = VAGABOND.MAPS.MAP_MODES;

    var Map = Object.create(Matrix);

    Map.init = function(h, w, mapType, defaults) {
      Matrix.init.call(this, h, w, defaults);

      this.setType(mapType);

      return this;
    };

    Map.setType = function(mapType) {
      var mapMode, defaults;

      this.mapType = mapType;

      mapMode = MAP_MODES.MapModes[mapType];

      defaults = UTIL.extend({
        initValue: mapMode.initValue,
        formatValue: mapMode.formatValue
      }, this.defaults);

      this.setDefaults(defaults);
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

    module.Map = Map;

    return module;

  })(VAGABOND.MAPS);
})();
