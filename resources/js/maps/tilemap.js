(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.MAPS');

  VAGABOND.MAPS = (function(module) {

    var Map = VAGABOND.MAPS.Map;

    var TileMap = Object.create(Map);

    module.TileMap = TileMap;

    return module;

  })(VAGABOND.MAPS);
})();
