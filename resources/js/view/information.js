(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.VIEW");

  VAGABOND.VIEW = (function(module) {

    var View = VAGABOND.VIEW.View;

    var Information = Object.create(View);

    Information.init = function(entity) {
      this.selectedEntity = entity;

      return this;
    };

    Information.setEntity = Information.init;

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

    module.Information = Information;

    return module;
  })(VAGABOND.VIEW);
})();
