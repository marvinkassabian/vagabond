"use strict";

// TODO: change name from screen to something else
var UTIL = require("../util/util");
var Matrix = require("../datastructures/matrix");
var View = require("./view");

var Screen = Object.create(Matrix);

Screen.init = function(height, width, x, y) {
  this.originX = x;
  this.originY = y;
  Matrix.init.call(this, height, width, {
    initValue: function() {
      return " ";
    }
  }).initGrid();

  return this;
};

// TODO: do something with this and Matrix.initGrid
Screen.clear = Matrix.initGrid;

Screen.move = function(dx, dy) {
  this.originX += dx;
  this.originY += dy;
};

Screen.isValidMove = function(dx, dy, level) {
  var map = level.map;
  var newX = this.originX + dx;
  var newY = this.originY + dy;

  return map.isValidCoordinate(newX + this.width - 1, newY + this.height - 1) &&
      map.isValidCoordinate(newX + this.width - 1, newY) &&
      map.isValidCoordinate(newX, newY + this.height - 1) &&
      map.isValidCoordinate(newX, newY);
};

Screen.getOrigin = function() {
  return {
    x: this.originX,
    y: this.originY
  };
};

Screen.toElement = function(options) {
  var i, j, screen, tileElement, value;

  options = UTIL.extend(options, {
    formatValue: function(value) {
      return value;
    },

    formatElement: function(value, x, y) {
      var offset = this.getOrigin();

      var tileElement = document.createElement("span");
      tileElement.classList.add("tile", "tile-" + ((value === " ") ? "SPACE" : value), "clickable");
      tileElement.id = (x + offset.x) + ":" + (y + offset.y);
      tileElement.dataset.x = (x + offset.x);
      tileElement.dataset.y = (y + offset.y);

      tileElement.innerHTML = value;

      return tileElement;
    }
  });

  screen = document.createElement("div");
  screen.className = "screen";

  for (i = 0; i < this.height; i++) {
    for (j = 0; j < this.width; j++) {
      value = options.formatValue.call(this, this.get(j, i), j, i);
      tileElement = options.formatElement.call(this, value, j, i);

      screen.appendChild(tileElement);
    }

    screen.appendChild(document.createElement("br"));
  }

  return screen;
};

Screen.renderToElement = View.renderToElement;

module.exports = Screen;
