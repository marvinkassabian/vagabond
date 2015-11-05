(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = Object.create(MovableKillableEntity);

    Monster.init = function(id, name, x, y, char, hp) {
      MovableKillableEntity.init.call(this, x, y, char, hp);

      this.id = id;
      this.name = name;

      return this;
    };

    Monster.getTraits = function() {
      var traits = MovableKillableEntity.getTraits.call(this);
      traits.id = this.id;
      traits.name = this.name;
      return traits;
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
