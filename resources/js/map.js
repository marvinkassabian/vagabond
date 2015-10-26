(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.MAP');

  VAGABOND.MAP = (function(module) {

    var Map = {};

    Map.init = function(h, w) {
      var i;
      var j;

      this.grid = {};
      this.height = h;
      this.width = w;

      /*
       *{0,0} {1,0} {2,0}  ...  {j,0}  ...  {w,0}
       *{0,1} {1,1} {2,1}  ...  {j,1}  ...  {w,1}
       *{0,2} {1,2} {2,2}  ...  {j,2}  ...  {w,2}
       * ...   ...   ...         ...         ...
       *{0,i} {1,i} {2,i}  ...  {j,i}  ...  {w,i}
       * ...   ...   ...   ...   ...   ...   ...
       *{0,h} {1,h} {2,h}  ...  {j,h}  ...  {w,h}
       */

      for (i = 0; i < this.height; i++) {
        for (j = 0; j < this.width; j++) {
          this.grid[(i * this.width) + j] = [];
        }
      }

      return this;
    };

    Map.toString = function() {
      var i;
      var j;
      var stringified = '';

      for (i = 0; i < this.width + 2; i++) {
        stringified += '*';
      }

      stringified += '<br>';

      for (i = 0; i < this.height; i++) {
        stringified += '*';

        for (j = 0; j < this.width; j++) {
          var tileChar;
          var tileList = this.grid[(i * this.width) + j];
          if (tileList.length > 0) {
            tileChar = tileList[0].char;
          } else {
            tileChar = '.';
          }

          stringified += tileChar;
        }

        stringified += '*<br>';
      }

      for (i = 0; i < this.width + 2; i++) {
        stringified += '*';
      }

      return stringified;
    };

    module.Map = Map;

    return module;

  })(VAGABOND.MAP);
})();
