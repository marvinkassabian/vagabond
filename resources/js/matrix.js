(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MATRIX");

  VAGABOND.MATRIX = (function(module) {

    var Matrix = {};

    Matrix.init = function(h, w, defaults) {
      this.grid = {};
      this.height = h;
      this.width = w;

      this.setDefaults(defaults);

      return this;
    };

    Matrix.setDefaults = function(defaults) {
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

    Matrix.initGrid = function(initValueFunc) {
      var i, j;

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

      return this;
    };

    Matrix.get = function(x, y) {
      return this.grid[(y * this.width) + x];
    };

    Matrix.set = function(x, y, value) {
      if (!this.isValidCoordinate(x, y)) {
        throw "OutOfBoundError: the coordinate (" + x + ", " + y + ") is out of bounds";
      }

      this.grid[(y * this.width) + x] = value;
    };

    Matrix.wrappedGet = function(x, y) {
      var wrappedCoor = this.wrapCoor(x, y);

      return this.get(wrappedCoor.x, wrappedCoor.y);
    };

    Matrix.wrappedSet = function(x, y, value) {
      var wrappedCoor = this.wrapCoor(x, y);

      return this.set(wrappedCoor.x, wrappedCoor.y, value);
    };

    Matrix.clampedGet = function(x, y) {
      var clampedCoor = this.clampCoor(x, y);

      return this.get(clampedCoor.x, clampedCoor.y);
    };

    Matrix.clampedSet = function(x, y, value) {
      var clampedCoor = this.clampCoor(x, y);

      return this.set(clampedCoor.x, clampedCoor.y, value);
    };

    Matrix.clampCoor = function(x, y) {
      return {
        x: UTIL.clamp(x, 0, this.width - 1),
        y: UTIL.clamp(y, 0, this.height - 1)
      };
    };

    Matrix.wrapCoor = function(x, y) {
      return {
        x: UTIL.wrap(x, 0, this.width),
        y: UTIL.wrap(y, 0, this.height)
      };
    };

    Matrix.isValidCoordinate = function(x, y) {
      return (x >= 0) &&
          (x < this.width) &&
          (y >= 0) &&
          (y < this.height);
    };

    Matrix.clone = function() {
      var clone = Object.create(Matrix);

      clone.init(this.height, this.width, this.defaults);
      clone.grid = JSON.parse(JSON.stringify(this.grid));

      return clone;
    };

    Matrix.toString = function(options) {
      var i, j, comma;
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

    Matrix.renderTo = function(screen, formatValue) {
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

    module.Matrix = Matrix;

    return module;

  })(VAGABOND.MATRIX);
})();
