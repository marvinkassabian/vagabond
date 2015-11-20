(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MODEL.ENTITIES");

  VAGABOND.MODEL.ENTITIES = (function(module) {

    var Entity = VAGABOND.MODEL.ENTITIES.Entity;

    var KillableEntity = Object.create(Entity);

    KillableEntity.init = function(id, x, y, char, hp) {
      Entity.init.call(this, id, x, y, char);

      // TODO: make variable name not shorthand to avoid 'Hp' or 'HP' issue
      this.totalHp = hp;
      this.hp = hp;

      return this;
    };

    // TODO: clean this
    KillableEntity.takeTurn = function() {
      if (this.hp <= 0) {
        // TODO: turn into a function
        this.char = "X";
        this.move = function() {};
      }
    };

    module.KillableEntity = KillableEntity;

    return module;
  })(VAGABOND.MODEL.ENTITIES);
})();
