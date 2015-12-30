"use strict";

var VirtualKeys = require("../util/virtualkeys");

var eventStack = require("./eventstack");

var KeyListener = {};

KeyListener.init = function() {
  this.codes = {};
  this.codes[VirtualKeys.VK_LEFT] = "screenLeft";
  this.codes[VirtualKeys.VK_RIGHT] = "screenRight";
  this.codes[VirtualKeys.VK_UP] = "screenUp";
  this.codes[VirtualKeys.VK_DOWN] = "screenDown";
  this.codes[VirtualKeys.VK_A] = "charLeft";
  this.codes[VirtualKeys.VK_D] = "charRight";
  this.codes[VirtualKeys.VK_W] = "charUp";
  this.codes[VirtualKeys.VK_S] = "charDown";
  this.codes[VirtualKeys.VK_NUMPAD8] = "logUp";
  this.codes[VirtualKeys.VK_NUMPAD2] = "logDown";
  this.codes[VirtualKeys.VK_F] = "endTurn";

  if (DEBUG) {
    this.codes[VirtualKeys.VK_SPACE] = "generate";
    this.codes[VirtualKeys.VK_RETURN] = "initMap";
    this.codes[VirtualKeys.VK_CONTROL] = "switchMapType";
  }

  document.addEventListener("keydown", this.onKey.bind(this), false);

  return this;
};

KeyListener.onKey = function(e) {
  var state = this.codes[e.keyCode];
  if (state === undefined) {
    return;
  }

  eventStack.addEvent({state: state, render: true});

  if (e.preventDefault !== undefined) {
    e.preventDefault();
  }

  if (e.stopPropagation !== undefined) {
    e.stopPropagation();
  }
};

module.exports = KeyListener;
