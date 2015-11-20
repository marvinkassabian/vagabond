(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.VIEW");

  VAGABOND.VIEW = (function(module) {

    var View = {};

    View.renderToElement = function(element) {
      var viewElement = this.toElement();

      element.innerHTML = viewElement.innerHTML;
    };

    module.View = View;

    return module;
  })(VAGABOND.VIEW);
})();
