(function(global) {

  var UTIL = (function() {

    // src: stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    // RFC4122 version 4 compliant
    var generateUUID = function() {
      var d = Date.now();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

      uuid = uuid.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });

      return uuid;
    };

    var unboundSlice = Array.prototype.slice;
    var slice = Function.prototype.call.bind(unboundSlice);

    // src: raganwald.com/2014/04/10/mixins-forwarding-delegation.html
    var extend = function() {
      var consumer = arguments[0];
      var providers = slice(arguments, 1);
      var key;
      var i;
      var provider;

      if (typeof consumer === 'undefined') {
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

    var clamp = function(value, min, max) {
      var temp;

      if (min > max) {
        temp = lower;
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
        temp = lower;
        min = max;
        max = temp;
      }

      range = max - min;

      return ((((value - min) % range) + range) % range) + min;
    };

    var nativeSetTimeout = window.setTimeout;

    var setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      var self = this, aArgs = Array.prototype.slice.call(arguments, 2);

      if (!(vCallback instanceof Function)) {
        throw 'Eval is doubleplusnotgood.';
      }

      return nativeSetTimeout(function () {
        vCallback.apply(self, aArgs);
      });
    };

    var nativeSetInterval = window.setInterval;

    var setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      var self = this, aArgs = Array.prototype.slice.call(arguments, 2);

      if (!(vCallback instanceof Function)) {
        throw 'Eval is doubleplusnotgood.';
      }

      return nativeSetInterval(function () {
        vCallback.apply(self, aArgs);
      });
    };

    this.generateUUID = generateUUID;
    this.extend = extend;
    this.clamp = clamp;
    this.wrap = wrap;
    this.setTimeout = setTimeout;
    this.setInterval = setInterval;

    return this;
  }).call(UTIL || {});

  global.UTIL = UTIL;

})(this);
