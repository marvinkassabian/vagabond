(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.VIEW");

  VAGABOND.VIEW = (function(module) {

    var View = {};

    View.toElement = function() {
    };

    View.renderToElement = function(element) {
      var viewElement = this.toElement();

      element.innerHTML = viewElement.innerHTML;
    };

    module.View = View;

    return module;
  })(VAGABOND.INTERFACE);
})();
