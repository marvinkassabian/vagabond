(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.ENTITIES");

  VAGABOND.MODEL.ENTITIES = (function(module) {

    var MovableKillableEntity = VAGABOND.MODEL.ENTITIES.MovableKillableEntity;
    var logger = UTIL.LOGGER.getLogger();

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
    Monster.attack = function(killableEntity) {
      logger.log(logger.toSentenceElement(this, "attacked", killableEntity));
      killableEntity.hp = Math.max(killableEntity.hp - this.strength, 0);
      if (killableEntity.isDead()) {
        logger.log(logger.toSentenceElement(this, "killed", killableEntity));
        killableEntity.die();
      }
    };

    module.Monster = Monster;

    return module;
  })(VAGABOND.MODEL.ENTITIES);
})();
