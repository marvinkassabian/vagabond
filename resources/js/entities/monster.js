(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = Object.create(MovableKillableEntity);

    Monster.init = function(x, y, char, hp, name, type) {
      MovableKillableEntity.init.call(this, UTIL.generateUUID(), x, y, char, hp);

      this.name = name;
      this.type = type;

      return this;
    };

    // TODO: move to a 'NamedEntity' object
    Monster.getFullName = function() {
      return this.name + ", the " + this.type;
    };

    // TODO: clean this
    Monster.attack = function(entity) {
      VAGABOND.writeToLog(VAGABOND.toSentence(this.getFullName(), "attacked", entity.getFullName()));
      entity.hp -= 5;
      if (entity.hp < 0) {
        // TODO: turn into a function
        VAGABOND.writeToLog(VAGABOND.toSentence(this.getFullName(), "killed", entity.getFullName()));
        entity.move = function() {};

        entity.char = "X";
      }
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
