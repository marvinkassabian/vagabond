(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLLER");

  VAGABOND.CONTROLLER = (function(module) {

    var VirtualKeys = UTIL.VIRTUAL_KEYS.VirtualKeys;

    var eventStack = VAGABOND.CONTROLLER.EventStack.getEventStack();

    var KeyListener = {};

    KeyListener.init = function() {
      this.codes = {};
      this.codes[VirtualKeys.VK_LEFT] = "screenLeft";
      this.codes[VirtualKeys.VK_RIGHT] = "screenRight";
      this.codes[VirtualKeys.VK_UP] = "screenUp";
      this.codes[VirtualKeys.VK_DOWN] = "screenDown";
      this.codes[VirtualKeys.VK_A] = "charLeft";
      this.codes[VirtualKeys.VK_D] = "charRight";
      this.codes[VirtualKeys.VK_W] = "charUp";
      this.codes[VirtualKeys.VK_S] = "charDown";
      this.codes[VirtualKeys.VK_NUMPAD8] = "logUp";
      this.codes[VirtualKeys.VK_NUMPAD2] = "logDown";

      if (DEBUG) {
        this.codes[VirtualKeys.VK_SPACE] = "generate";
        this.codes[VirtualKeys.VK_RETURN] = "initMap";
        this.codes[VirtualKeys.VK_CONTROL] = "switchMapType";
      }

      document.addEventListener("keydown", this.onKey.bind(this), false);

      return this;
    };

    KeyListener.onKey = function(e) {
      var state = this.codes[e.keyCode];
      if (state === undefined) {
        return;
      }

      eventStack.add({state: state, render: true});

      if (e.preventDefault !== undefined) {
        e.preventDefault();
      }

      if (e.stopPropagation !== undefined) {
        e.stopPropagation();
      }
    };

    module.KeyListener = KeyListener;

    return module;

  })(VAGABOND.CONTROLLER);

})();
