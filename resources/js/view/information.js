"use strict";

var View = require("./view");

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

module.exports = View;
