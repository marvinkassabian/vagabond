(function() {
  "use strict";

  //TODO: rename Map to Matrix
  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var Map = {};

    Map.init = function(h, w, defaults) {
      this.grid = {};
      this.height = h;
      this.width = w;

      this.setDefaults(defaults);

      this.initGrid(this.defaults.initValue);

      return this;
    };

    Map.setDefaults = function(defaults) {
      this.defaults = UTIL.extend(defaults, {
        initValue: function() {
          return 0;
        },
        formatValue: function(value) {
          return value;
        },
        formatReturn: function(ret) {
          return ret;
        },
        formatting: {
          OPEN: "[",
          SEPERATOR: ", ",
          CLOSE: "]\n"
        }
      });
    };

    Map.generate = function(generateFunc /*, argumentToPass1, argumentToPass2, etc. */) {
      var aArgs = Array.prototype.slice.call(arguments, 1);
      generateFunc.apply(null, aArgs);
      return this;
    };

    Map.initGrid = function(initValueFunc) {
      var i;
      var j;

      if (initValueFunc === undefined) {
        initValueFunc = this.defaults.initValue;
      }

      // { 0,0} { 1,0} { 2,0}  ...  { j,0}  ...  { w,0}
      // { 0,1} { 1,1} { 2,1}  ...  { j,1}  ...  { w,1}
      // { 0,2} { 1,2} { 2,2}  ...  { j,2}  ...  { w,2}
      //  ...   ...   ...         ...         ...
      // { 0,i} { 1,i} { 2,i}  ...  { j,i}  ...  { w,i}
      //  ...   ...   ...         ...         ...
      // { 0,h} { 1,h} { 2,h}  ...  { j,h}  ...  { w,h}
      for (i = 0; i < this.height; i++) {
        for (j = 0; j < this.width; j++) {
          this.set(j, i, initValueFunc(j, i, this.height, this.width));
        }
      }
    };

    Map.get = function(x, y) {
      return this.grid[(y * this.width) + x];
    };

    Map.set = function(x, y, value) {
      if (!this.isValidCoordinate(x, y)) {
        throw "OutOfBoundError: the coordinate (" + x + ", " + y + ") is out of bounds";
      }

      this.grid[(y * this.width) + x] = value;
    };

    Map.wrappedGet = function(x, y) {
      var wrappedCoor = this.wrapCoor(x, y);

      return this.get(wrappedCoor.x, wrappedCoor.y);
    };

    Map.wrappedSet = function(x, y, value) {
      var wrappedCoor = this.wrapCoor(x, y);

      return this.set(wrappedCoor.x, wrappedCoor.y, value);
    };

    Map.clampedGet = function(x, y) {
      var clampedCoor = this.clampCoor(x, y);

      return this.get(clampedCoor.x, clampedCoor.y);
    };

    Map.clampedSet = function(x, y, value) {
      var clampedCoor = this.clampCoor(x, y);

      return this.set(clampedCoor.x, clampedCoor.y, value);
    };

    Map.clampCoor = function(x, y) {
      return {
        x: UTIL.clamp(x, 0, this.width - 1),
        y: UTIL.clamp(y, 0, this.height - 1)
      };
    };

    Map.wrapCoor = function(x, y) {
      return {
        x: UTIL.wrap(x, 0, this.width),
        y: UTIL.wrap(y, 0, this.height)
      };
    };

    Map.isValidCoordinate = function(x, y) {
      return (x >= 0) &&
          (x < this.width) &&
          (y >= 0) &&
          (y < this.height);
    };

    Map.toString = function(options) {
      var i;
      var j;
      var comma;
      var ret = "";

      options = UTIL.extend(options, {
        formatValue: this.defaults.formatValue,
        formatReturn: this.defaults.formatReturn,
        formatting: this.defaults.formatting
      });

      for (i = 0; i < this.height; i++) {
        ret += options.formatting.OPEN;
        comma = "";
        for (j = 0; j < this.width; j++) {
          ret += comma + options.formatValue.call(this, this.get(j, i), j, i);
          comma = options.formatting.SEPERATOR;
        }

        ret += options.formatting.CLOSE;
      }

      return options.formatReturn.call(this, ret);
    };

    Map.renderTo = function(screen, formatValue) {
      var i;
      var j;

      if (formatValue === undefined) {
        formatValue = this.defaults.formatValue;
      }

      var offset = screen.getOrigin();

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
