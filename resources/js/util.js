(function(global) {

  var UTIL = (function() {

    // retrieved from:
    // stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
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

    this.generateUUID = generateUUID;

    return this;
  }).call(UTIL || {});

  global.UTIL = UTIL;

})(this);
