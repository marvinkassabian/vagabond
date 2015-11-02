(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = Object.create(MovableKillableEntity);

    var initProto = Monster.init;
    var getTraitsProto = Monster.getTraits;

    Monster.init = function(id, name, x, y, char, hp) {
      initProto.call(this, x, y, char, hp);

      this.id = id;
      this.name = name;

      return this;
    };

    Monster.getTraits = function() {
      var traits = getTraitsProto.call(this);
      traits.id = this.id;
      traits.name = this.name;
      return traits;
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
