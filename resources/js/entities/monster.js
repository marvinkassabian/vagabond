(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = Object.create(MovableKillableEntity);

    var initProto = Monster.init.bind(Monster);
    var getTraitsProto = Monster.getTraits.bind(Monster);

    Monster.init = function(id, name, x, y, hp) {
      initProto(x, y, hp);

      this.id = id;
      this.name = name;

      return this;
    };

    Monster.getTraits = function() {
      var traits = getTraitsProto();
      traits.id = this.id;
      traits.name = this.name;
      return traits;
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
