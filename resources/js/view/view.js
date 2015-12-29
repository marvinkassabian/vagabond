"use strict";

var View = {};

View.renderToElement = function(element) {
  var viewElement = this.toElement();

  element.innerHTML = viewElement.innerHTML;
};

module.exports = View;
