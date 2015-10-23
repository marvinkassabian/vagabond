(function() {

  var Entity = (function() {
    var x;
    var y;

    var Entity = {};

    Entity.init = function(x0, y0) {
      return Entity.initEntity(x0, y0);
    };

    Entity.initEntity = function(x0, y0) {
      this.setCoor(x0, y0);

      return this;
    };

    Entity.setCoor = function(x0, y0) {
      x = x0;
      y = y0;

      return this;
    };

    Entity.getCoor = function() {
      return {
        x: x,
        y: y
      };
    };

    Entity.move = function(dx, dy) {
      x += dx;
      y += dy;

      return this;
    };

    return Entity;
  })();

  var KillableEntity = (function() {
    var hitPoints;

    var KillableEntity = Object.create(Entity);

    KillableEntity.init = function(x0, y0, hp0) {
      return this.initKillableEntity(x0, y0, hp0);
    };

    KillableEntity.initKillableEntity = function(x0, y0, hp0) {
      this.initEntity(x0, y0);
      this.setHealth(hp0);

      return this;
    };

    KillableEntity.setHealth = function(hp) {
      hitPoints = hp;
    };

    KillableEntity.getHealth = function() {
      return hitPoints;
    };

    return KillableEntity;
  })();

  var Monster = (function() {
    var attack;
    var defense;

    var Monster = Object.create(KillableEntity);

    Monster.init = function(x0, y0, hp0, a0, d0) {
      return this.initMonster(x0, y0, hp0, a0, d0);
    };

    Monster.initMonster = function(x0, y0, hp0, a0, d0) {
      this.initKillableEntity(x0, y0, hp0);
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

    return Monster;
  })();

  var milo = Object.create(Monster).init(2, 5, 30, 4, 6);

  console.log(milo.getCoor());
  console.log(milo.getHealth());
  console.log(milo.getDefense());
  milo.takeDamage(10);
  console.log(milo.getHealth());
})();
