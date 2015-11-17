(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.ENTITIES");

  VAGABOND.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.ENTITIES.MovableKillableEntity;

    var Monster = Object.create(MovableKillableEntity);

    Monster.init = function(x, y, char, hp, name, type, strength) {
      MovableKillableEntity.init.call(this, UTIL.generateUUID(), x, y, char, hp);

      this.name = name;
      this.type = type;
      this.strength = strength;

      return this;
    };

    // TODO: move to a 'NamedEntity' object
    Monster.getFullName = function() {
      return this.name + ", the " + this.type;
    };

    // TODO: move this method to entity and 'inherit' down
    Monster.getInformation = function() {
      return {
        x: this.x,
        y: this.y,
        char: this.char,
        hp: this.hp,
        totalHp: this.totalHp,
        name: this.name,
        type: this.type,
        fullName: this.getFullName(),
        strength: this.strength
      };
    };

    // TODO: clean this
    Monster.attack = function(entity) {
      VAGABOND.writeToLog(VAGABOND.toSentence(this.getFullName(), "attacked", entity.getFullName()));
      entity.hp -= this.strength;
      if (entity.hp < 0) {
        // TODO: turn into a function
        VAGABOND.writeToLog(VAGABOND.toSentence(this.getFullName(), "killed", entity.getFullName()));

        // TODO: do something more elegant
        entity.move = function() {};

        // TODO: do something more elegant
        entity.attack = function() {};

        // TODO: do something more elegant
        entity.takeTurn = function() {};

        entity.char = "X";
      }
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
