(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.TRAITS');

  VAGABOND.TRAITS = (function(module) {

    var hasID = function(initID) {
      var id = initID;

      return {
        getID: function() {
          return id;
        },

        setID: function(newID) {
          id = newID;
        }
      };
    };

    module.hasID = hasID;

    return module;
  })(VAGABOND.TRAITS);
})();
