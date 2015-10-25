(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.TRAITS');

  VAGABOND.TRAITS = (function(module) {

    var hasCoor = function(initX, initY) {
      var x = initX;
      var y = initY;

      return {
        getX: function() {
          return x;
        },

        getY: function() {
          return y;
        },

        setX: function(newX) {
          x = newX;
        },

        setY: function(newY) {
          y = newY;
        }
      };
    };

    module.hasCoor = hasCoor;

    return module;
  })(VAGABOND.TRAITS);
})();
