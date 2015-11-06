(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.CONTROLS");

  //TODO: think of a better name
  VAGABOND.CONTROLS = (function(module) {

    var VirtualKeys = UTIL.VIRTUAL_KEYS.VirtualKeys;

    var Listener = {};

    Listener.init = function() {
      this.eventStack = [];
      this.codes = {};
      this.codes[VirtualKeys.VK_LEFT] = "screenLeft";
      this.codes[VirtualKeys.VK_RIGHT] = "screenRight";
      this.codes[VirtualKeys.VK_UP] = "screenUp";
      this.codes[VirtualKeys.VK_DOWN] = "screenDown";
      this.codes[VirtualKeys.VK_A] = "charLeft";
      this.codes[VirtualKeys.VK_D] = "charRight";
      this.codes[VirtualKeys.VK_W] = "charUp";
      this.codes[VirtualKeys.VK_S] = "charDown";
      this.codes[VirtualKeys.VK_SPACE] = "algorithm";
      this.codes[VirtualKeys.VK_1] = "diamondSquare";
      this.codes[VirtualKeys.VK_2] = "cellularAutomata";
      this.codes[VirtualKeys.VK_RETURN] = "initMap";
      this.codes[VirtualKeys.VK_CONTROL] = "switchMapType";

      document.addEventListener("keydown", this.onKey.bind(this), false);

      return this;
    };

    Listener.onKey = function(e) {
      var state = this.codes[e.keyCode];
      if (state === undefined) {
        return;
      }

      //TODO: seperate eventStack and listener
      if (this.eventStack.length === 0) {
        this.eventStack.push({state: state, render: true});
      }

      if (e.preventDefault !== undefined) {
        e.preventDefault();
      }

      if (e.stopPropagation !== undefined) {
        e.stopPropagation();
      }
    };

    module.Listener = Listener;

    return module;

  })(VAGABOND.CONTROLS);

})();
