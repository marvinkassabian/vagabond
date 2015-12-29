(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.DATA_STRUCTURES");

  VAGABOND.DATA_STRUCTURES = (function(module) {

    var Matrix = {};

    Matrix.init = function(h, w, defaults) {
      this.grid = [];
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

      // {0,0} {1,0} {2,0}  ...  {i,0}  ...  {w,0}
      // {0,1} {1,1} {2,1}  ...  {i,1}  ...  {w,1}
      // {0,2} {1,2} {2,2}  ...  {i,2}  ...  {w,2}
      //  ...   ...   ...         ...         ...
      // {0,j} {1,j} {2,j}  ...  {i,j}  ...  {w,j}
      //  ...   ...   ...         ...         ...
      // {0,h} {1,h} {2,h}  ...  {i,h}  ...  {w,h}
      for (i = 0; i < this.width; i++) {
        this.grid[i] = this.grid[i] || [];

        for (j = 0; j < this.height; j++) {
          this.set(i, j, initValueFunc(i, j, this.height, this.width));
        }
      }

      return this;
    };

    Matrix.get = function(x, y) {
      return this.grid[x][y];
    };

    Matrix.set = function(x, y, value) {
      if (!this.isValidCoordinate(x, y)) {
        throw "OutOfBoundError: the coordinate (" + x + ", " + y + ") is out of bounds";
      }

      this.grid[x][y] = value;
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
          (y < this.height) &&
          (x % 1 === 0) &&
          (y % 1 === 0);
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

      for (i = 0; i < this.width; i++) {
        ret += options.formatting.OPEN;
        comma = "";
        for (j = 0; j < this.height; j++) {
          ret += comma + options.formatValue.call(this, this.get(i, j), i, j);
          comma = options.formatting.SEPERATOR;
        }

        ret += options.formatting.CLOSE;
      }

      return options.formatReturn.call(this, ret);
    };

    module.Matrix = Matrix;

    return module;

  })(VAGABOND.DATA_STRUCTURES);
})();
