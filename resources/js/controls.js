(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  VAGABOND.CONTROLS = (function(module) {

    var VIRTUAL_KEYS = UTIL.VIRTUAL_KEYS;

    var Controls = {};

    Controls.init = function() {
      this.eventStack = [];
      this.codes = {};
      this.codes[VIRTUAL_KEYS.VK_LEFT] = "screenLeft";
      this.codes[VIRTUAL_KEYS.VK_RIGHT] = "screenRight";
      this.codes[VIRTUAL_KEYS.VK_UP] = "screenUp";
      this.codes[VIRTUAL_KEYS.VK_DOWN] = "screenDown";
      this.codes[VIRTUAL_KEYS.VK_A] = "charLeft";
      this.codes[VIRTUAL_KEYS.VK_D] = "charRight";
      this.codes[VIRTUAL_KEYS.VK_W] = "charUp";
      this.codes[VIRTUAL_KEYS.VK_S] = "charDown";
      this.codes[VIRTUAL_KEYS.VK_SPACE] = "normalize";
      document.addEventListener("keydown", this.onKey.bind(this), false);

      return this;
    };

    Controls.onKey = function(e) {
      var state = this.codes[e.keyCode];
      if (state === undefined) {
        return;
      }

      this.eventStack.push(state);

      if (e.preventDefault !== undefined) {
        e.preventDefault();
      }

      if (e.stopPropagation !== undefined) {
        e.stopPropagation();
      }
    };

    module.Controls = Controls;

    return module;

  })(VAGABOND.CONTROLS);

})();
