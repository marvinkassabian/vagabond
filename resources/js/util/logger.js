"use strict";

var Logger = {};

Logger.init = function() {
  this.logs = [];

  return this;
};

Logger.log = function(log) {
  this.logs.unshift(log);
};

Logger.getSize = function() {
  return this.logs.length;
};

// TODO: figure out where this function should go
Logger.toSentenceElement = function(subject, verb, object) {

  var subjectElement = document.createElement("span");
  subjectElement.innerHTML = "[" + subject.getFullName() + "]";
  subjectElement.dataset.id = subject.id;
  subjectElement.classList.add("clickable", "log");

  var verbNode = document.createTextNode(" " + verb + " ");

  var objectElement = document.createElement("span");
  objectElement.innerHTML = "[" + object.getFullName() + "]";
  objectElement.dataset.id = object.id;
  objectElement.classList.add("clickable", "log");

  var sentenceElement = document.createElement("span");

  sentenceElement.appendChild(subjectElement);
  sentenceElement.appendChild(verbNode);
  sentenceElement.appendChild(objectElement);

  return sentenceElement;
};

module.exports = Object.create(Logger).init();
