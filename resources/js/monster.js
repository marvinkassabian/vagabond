(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.ENTITIES');

  VAGABOND.ENTITIES = (function(module) {

    var KillableEntity = VAGABOND.ENTITIES.KillableEntity;

    var Monster = (function() {
      var attack;
      var defense;
      var killableEntity = new KillableEntity();

      var Monster = {};

      Monster.init = function(x0, y0, hp0, a0, d0) {
        killableEntity.init(x0, y0, hp0);
        this.setAttack(a0);
        this.setDefense(d0);

        return this;
      };

      Monster.setAttack = function(a0) {
        attack = a0;
      };

      Monster.getAttack = function() {
        return attack;
      };

      Monster.setDefense = function(d0) {
        defense = d0;
      };

      Monster.getDefense = function() {
        return defense;
      };

      Monster.takeDamage = function(damage) {
        var health = this.getHealth();
        damage = Math.max(0, damage - this.getDefense());
        this.setHealth(health - damage);
      };

      Monster.setCoor = killableEntity.setCoor;
      Monster.getCoor = killableEntity.getCoor;
      Monster.move = killableEntity.move;
      Monster.setHealth = killableEntity.setHealth;
      Monster.getHealth = killableEntity.getHealth;

      return Monster;
    });

    module.Monster = Monster;

    return module;
  })(VAGABOND.ENTITIES);
})();
