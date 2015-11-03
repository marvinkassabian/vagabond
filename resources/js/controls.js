(function() { //TODO: understand the code, add jQuery
  "use strict";

  VAGABOND.namespace('VAGABOND.CONTROLS');

  VAGABOND.CONTROLS = (function(module) {

    var VIRTUAL_KEYS = UTIL.VIRTUAL_KEYS;

    var Controls = {};

    Controls.init = function() {
      this.eventStack = [];
      this.codes = {};
      this.codes[VIRTUAL_KEYS.VK_LEFT] = 'left';
      this.codes[VIRTUAL_KEYS.VK_RIGHT] = 'right';
      this.codes[VIRTUAL_KEYS.VK_UP] = 'up';
      this.codes[VIRTUAL_KEYS.VK_DOWN] = 'down';
      document.addEventListener('keydown', this.onKey.bind(this, true), false);

      return this;
    };

    Controls.onKey = function(val, e) {
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
