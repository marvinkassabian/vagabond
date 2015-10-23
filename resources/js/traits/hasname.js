(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.TRAITS');

  VAGABOND.TRAITS = (function(module) {

    var hasName = function(initName) {
      var name = initName;

      return {
        getName: function() {
          return name;
        },

        setName: function(newName) {
          name = newName;
        }
      };
    };

    module.hasName = hasName;

    return module;
  })(VAGABOND.TRAITS);
})();
