(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.INTERFACE");

  VAGABOND.INTERFACE = (function(module) {

    var Information = {};

    Information.init = function(entity) {
      this.selectedEntity = entity;

      return this;
    };

    Information.toElement = function() {
      var info = document.createElement("div");
      info.className = "selected-info";

      var entityInfo = this.selectedEntity.getInformation();

      for (var traitKey in entityInfo) {
        var traitElement = document.createElement("span");
        traitElement.innerHTML = traitKey + ": " + entityInfo[traitKey];
        info.appendChild(traitElement);
        info.appendChild(document.createElement("br"));
      }

      return info;
    };

    Information.renderToElement = function(element) {
      var screenElement = this.toElement();

      element.innerHTML = screenElement.innerHTML;
    };

    module.Information = Information;

    return module;
  })(VAGABOND.INTERFACE);
})();
