"use strict";


var d = require("distance-calc");
var MAP_FACTORY = require("../model/maps/factory");
var ClickListener = require("./clicklistener");
var eventStack = require("./eventstack");

var Controller = {};

Controller.init = function(listener) {
  this.listener = listener;

  return this;
};

// TODO: clean this up, clean all of this up
Controller.processInput = function(screen, avatar, level, info, logs) {

  if (eventStack.getSize() > 0) {

    var eventBlob = eventStack.getEvent();
    var event = eventBlob.state;

    var moves = {
      screenUp: {dx: 0, dy: -1, entity: screen, useTurn: false},
      screenDown: {dx: 0, dy: 1, entity: screen, useTurn: false},
      screenLeft: {dx: -1, dy: 0, entity: screen, useTurn: false},
      screenRight: {dx: 1, dy: 0, entity: screen, useTurn: false},
      charUp: {dx: 0, dy: -1, entity: avatar, useTurn: true},
      charDown: {dx: 0, dy: 1, entity: avatar, useTurn: true},
      charLeft: {dx: -1, dy: 0, entity: avatar, useTurn: true},
      charRight: {dx: 1, dy: 0, entity: avatar, useTurn: true}
    };

    var move = moves[event];

    if (move && move.entity.isValidMove(move.dx, move.dy, level)) {
      move.entity.move(move.dx, move.dy);
    }

    handleClick(level, info, avatar, eventBlob);

    handleLogs(logs, eventBlob);

    if ((move && move.useTurn) || eventBlob.useTurn) {
      level.takeTurn();
    }

    handleMap(event, level);

    if (eventBlob.render) {
      level.renderTo(screen);
      screen.renderToElement(document.body.getElementsByClassName("screen")[0]);
      info.renderToElement(document.body.getElementsByClassName("selected-info")[0]);
      logs.renderToElement(document.body.getElementsByClassName("logs")[0]);

      var clickListener = Object.create(ClickListener).init();

      colorPossibleMoveTiles(level, clickListener);
    }
  }
};

function handleLogs(logs, eventBlob) {
  var event = eventBlob.state;

  if (event === "logDown") {
    logs.offset = Math.min(logs.offset + 1, Math.max(logs.getSize() - 1, 0));
  } else if (event === "logUp") {
    logs.offset = Math.max(logs.offset - 1, 0);
  }
}

function handleClick(level, info, avatar, eventBlob) {

  var entity;

  if (eventBlob.state === "clickTile") {
    var clickCoordinate = {
      x: eventBlob.data.coordinate.x,
      y: eventBlob.data.coordinate.y
    };

    // TODO: sort entities by health
    // TODO: eventually allow player to choose which entity to attack
    entity = level.getEntitiesAt(clickCoordinate).sort(function(a, b) {
      return b.hp - a.hp;
    })[0];

    if (entity !== undefined) {

      info.init(entity);

      if (d.norm([avatar.x, avatar.y], [entity.x, entity.y], 1) === 1 && entity.hp > 0) {
        avatar.attack(entity);
        eventBlob.useTurn = true;
      }
    } else {
      info.init(avatar);
    }
  } else if (eventBlob.state === "clickLog") {
    entity = level.entityMap[eventBlob.data.id];

    info.init(entity);
  }
}

// TODO: clean this / move to screen
function colorPossibleMoveTiles(level, clickListener) {
  var possibleMoves = level.map.getPossibleMoves(level.player);

  for (var i = 0; i < possibleMoves.length; i++) {
    var possibleMove = possibleMoves[i];
    var tile = clickListener.getTile(possibleMove.x, possibleMove.y);

    if (tile) {
      tile.classList.add("possible");
    }
  }
}

function handleMap(event, level) {
  var map = level.map;
  if (event === "generate") {
    map.generate();
  } else if (event === "initMap") {
    map.initGrid();
  } else if (event === "switchMapType") {
    var nextDimension = Math.max(map.width, map.height);

    if (map.type === "height") {
      level.map = MAP_FACTORY.createDungeonMap(nextDimension, nextDimension);
    } else {
      level.map = MAP_FACTORY.createHeightMap(nextDimension);
    }

    level.map.initGrid();
  }
}

module.exports = Controller;
