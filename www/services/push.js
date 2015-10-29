(function () {
  "use strict";

  var app = angular.module('cradair');

  app.service('Push', function () {
    var registrationId;

    return {
      init: function() {
        var push = new Ionic.Push({
          "debug": true
        });

        push.register(function(token) {
          registrationId = token;
          console.log("Device token:",token.token);
        });

      },
      getRegistrationId: function() {
        return registrationId;
      }
    }
  });

})();
