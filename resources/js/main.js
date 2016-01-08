"use strict";

var PlayerEntity = require("./model/entities/playerentity");
var Goblin = require("./model/entities/enemies/goblin");
var MAP_FACTORY = require("./model/maps/factory");
var Screen = require("./view/screen");
var Level = require("./model/level");
var KeyListener = require("./controller/keylistener");
var Controller = require("./controller/controller");
var GameLoop = require("./controller/gameloop");
var Information = require("./view/information");
var Logs = require("./view/logs");

var logger = require("./util/logger");
var eventStack = require("./controller/eventstack");

// models
var milo = Object.create(PlayerEntity).init(10, 10, "#", 34, "Milo", "Dwarf", 15);
var otis = Object.create(Goblin).init(5, 10, 50, "Grot");
var henry = Object.create(Goblin).init(8, 15, 60, "Snik");

var map = MAP_FACTORY.createDungeonMap(40, 129);

var level = Object.create(Level).init(map);

// controllers
var keyListener = Object.create(KeyListener).init();
var controller = Object.create(Controller).init(keyListener);

// views
var myScreen = Object.create(Screen).init(20, 80, 0, 0);
var info = Object.create(Information).init(milo);
var logs = Object.create(Logs).init(logger, 13);

global.level = level;

eventStack.addEvent({state: "generate", render: true});

level.addEntity(milo, otis, henry);

var i;
for (i = 0; i < 3; i++) {
  var gobbo = Object.create(Goblin).init(
      Math.floor(Math.random() * map.width),
      Math.floor(Math.random() * map.height),
      50, "#" + i);

  gobbo.getFullName = function() {
    return "Random " + this.type + " " + this.name;
  };

  level.addEntity(gobbo);
}

level.setPlayer(milo);

var gameLoop = Object.create(GameLoop).init(1 / 40);
gameLoop.start(controller.processInput.bind(controller, myScreen, milo, level, info, logs));
