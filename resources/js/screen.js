(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.SCREEN');

  VAGABOND.SCREEN = (function(module) {

    var Map = VAGABOND.MAPS.Map;

    var Screen = Object.create(Map);

    var initProto = Map.init;

    Screen.init = function(height, width) {
      initProto.call(this, height, width, function() {
        return ' ';
      });

      return this;
    };

    module.Screen = Screen;

    return module;

  })(VAGABOND.SCREEN);
})();
