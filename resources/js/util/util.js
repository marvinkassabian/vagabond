(function(global) {
  "use strict";

  var UTIL = (function() {

    var namespace = function() {
      var i, j, d;
      var a = arguments;
      var o = null;

      for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = UTIL;

        for (j = ((d[0] === "UTIL") ? 1 : 0); j < d.length; j++) {
          o[d[j]] = o[d[j]] || {};
          o = o[d[j]];
        }
      }

      return o;
    };

    // src: stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    // RFC4122 version 4 compliant
    var generateUUID = function() {
      var d = Date.now();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

      uuid = uuid.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
      });

      return uuid;
    };

    // src: raganwald.com/2014/04/10/mixins-forwarding-delegation.html
    var extend = function() {
      var consumer = arguments[0];
      var providers = Array.prototype.slice.call(arguments, 1);
      var key;
      var i;
      var provider;

      if (consumer === undefined) {
        consumer = {};
      }

      for (i = 0; i < providers.length; ++i) {
        provider = providers[i];
        for (key in provider) {
          if (!consumer.hasOwnProperty(key)) {
            consumer[key] = provider[key];
          }
        }
      }

      return consumer;
    };

    // clamps the value in the range of [min, max]
    var clamp = function(value, min, max) {
      var temp;

      if (min > max) {
        temp = min;
        min = max;
        max = temp;
      }

      return Math.max(Math.min(value, max), min);
    };

    // wraps the value in the range of [min, max)
    var wrap = function(value, min, max) {
      var temp;
      var range;

      if (min > max) {
        temp = min;
        min = max;
        max = temp;
      }

      range = max - min;

      return ((((value - min) % range) + range) % range) + min;
    };

    // src: developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
    var setTimeout = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      var aArgs = Array.prototype.slice.call(arguments, 2);

      if (!(vCallback instanceof Function)) {
        throw "EvilError: implicit \"eval\" is evil";
      }

      var boundCallback = vCallback.bind(this);

      return window.setTimeout(function() {
        boundCallback(aArgs);
      }, nDelay);
    };

    // src: developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
    var setInterval = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      var aArgs = Array.prototype.slice.call(arguments, 2);

      if (!(vCallback instanceof Function)) {
        throw "EvilError: implicit \"eval\" is evil";
      }

      var boundCallback = vCallback.bind(this);

      return window.setInterval(function() {
        boundCallback(aArgs);
      }, nDelay);
    };

    var zeroPad = function(num, size) {
      var number;
      var zeros;
      var zeroString;

      if (isNaN(num)) {
        number = num.toString();
        while (number.length < size) {
          number = "0" + number;
        }

        return number;
      } else {
        number = Math.abs(num);
        zeros = Math.max(0, size - Math.floor(number).toString().length);
        zeroString = Math.pow(10, zeros).toString().substr(1);
        if (num < 0) {
          zeroString[0] = "-";
        }

        return zeroString + number;
      }
    };

    var random = function(upper, lower) {
      var temp;

      if (upper === undefined) {
        upper = 1;
      }

      if (lower === undefined) {
        lower = 0;
      }

      if (lower > upper) {
        temp = lower;
        lower = upper;
        upper = temp;
      }

      return (Math.random() * (upper - lower)) + lower;
    };

    // src: Underscore.js
    var shuffle = function(obj) {
      var set = obj;
      var length = set.length;
      var shuffled = [];
      for (var index = 0, rand; index < length; index++) {
        rand = Math.floor(UTIL.random(0, index));
        if (rand !== index) {
          shuffled[index] = shuffled[rand];
        }

        shuffled[rand] = set[index];
      }

      return shuffled;
    };

    // TODO: rename this to better reflect what it is
    var ADJACENT = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
      [0, 0]
    ];

    var VALID_MOVES = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
      [0, 0]
    ];

    var distance = function(origin, destination, power) {
      var dx = Math.pow(Math.abs(origin.x - destination.x), power);
      var dy = Math.pow(Math.abs(origin.y - destination.y), power);
      return Math.pow(dx + dy, 1 / power);
    };

    var manhattanDistance = function(origin, destination) {
      var dx = Math.abs(origin.x - destination.x);
      var dy = Math.abs(origin.y - destination.y);
      return dx + dy;
    };

    var straightLineDistance = function(origin, destination) {
      return distance(origin, destination, 2);
    };

    this.namespace = namespace;
    this.generateUUID = generateUUID;
    this.extend = extend;
    this.clamp = clamp;
    this.wrap = wrap;
    this.setTimeout = setTimeout;
    this.setInterval = setInterval;
    this.zeroPad = zeroPad;
    this.random = random;
    this.shuffle = shuffle;
    this.ADJACENT = ADJACENT;
    this.VALID_MOVES = VALID_MOVES;
    this.manhattanDistance = manhattanDistance;
    this.straightLineDistance = straightLineDistance;
    this.distance = distance;

    return this;
  }).call(UTIL || {});

  global.UTIL = UTIL;

})(this);
