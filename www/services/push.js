(function () {
  "use strict";

  var app = angular.module('cradair');

  app.service('Push', function ($ionicPush) {
    var registrationId;

    return {
      init: function() {
        $ionicPush.init({
          debug: true,
          onNotification: function (notification) {
            var payload = notification.payload;
            console.log("Notification received", notification, payload);
          },
          "onRegister": function (data) {
            registrationId = data.token;
            console.log("Device token:", data.token);
          },
          pluginConfig: {
            "ios": {
              "badge": true,
              "sound": true
            },
            "android": {
              "iconColor": "#343434"
            }
          }
        });

        $ionicPush.register();
      },

      getRegistrationId: function() {
        return registrationId;
      }
    }
  });

})();