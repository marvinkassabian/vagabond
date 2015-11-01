(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var Map = {};

    Map.init = function(h, w, initValueFunc) {
      var i;
      var j;

      this.grid = {};
      this.height = h;
      this.width = w;

      if (initValueFunc === undefined) {
        initValueFunc = function() {
          return 0;
        };
      }

      /*
       *{0,0} {1,0} {2,0}  ...  {j,0}  ...  {w,0}
       *{0,1} {1,1} {2,1}  ...  {j,1}  ...  {w,1}
       *{0,2} {1,2} {2,2}  ...  {j,2}  ...  {w,2}
       * ...   ...   ...         ...         ...
       *{0,i} {1,i} {2,i}  ...  {j,i}  ...  {w,i}
       * ...   ...   ...         ...         ...
       *{0,h} {1,h} {2,h}  ...  {j,h}  ...  {w,h}
       */

      for (i = 0; i < this.height; i++) {
        for (j = 0; j < this.width; j++) {
          this.set(j, i, initValueFunc(j, i, this.height, this.width));
        }
      }

      return this;
    };

    Map.get = function(x, y) {
      return this.grid[(y * this.width) + x];
    };

    Map.set = function(x, y, value) {
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
      var ret = '';

      options = UTIL.extend(options, {
        formatValue: function(value) {
          return Math.floor(value);
        },
        formatRet: function(ret) {
          return ret;
        }
      });

      for (i = 0; i < this.height; i++) {
        ret += '[';
        comma = '';
        for (j = 0; j < this.width; j++) {
          ret += comma + options.formatValue.call(this, this.get(j, i), j, i);
          comma = ', ';
        }

        ret += ']\n';
      }

      return options.formatRet.call(this, ret);
    };

    Map.render = function(element, options) {
      options = UTIL.extend(options, {
        formatRet: function(ret) {
          return ret.replace(/\n/g, '<br>').replace(/ |,|\[|\]/g, '');
        }
      });

      element.innerHTML = this.toString(options);
    };

    module.Map = Map;

    return module;

  })(VAGABOND.MAPS);
})();
