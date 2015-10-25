(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = function(id, name, x, y, hp) {
      MovableKillableEntity.call(this, x, y, hp);

      this.id = id;
      this.name = name;
    };

    Monster.prototype = Object.create(MovableKillableEntity.prototype);

    Monster.prototype.getTraits = function() {
      var traits = MovableKillableEntity.prototype.getTraits.call(this);
      traits.id = this.id;
      traits.name = this.name;
      return traits;
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
