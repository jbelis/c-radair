(function () {
  "use strict";

  var app = angular.module('starter', ['ionic']);

  app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      var push = new Ionic.Push({
        "debug": true
      });

      push.register(function (token) {
        console.log("Device token:", token.token);
      });

    });
  });
})();
