(function () {
  "use strict";

  var app = angular.module('cradair', ['ionic']);

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

      push.register(function(token) {
        console.log("Device token:",token.token);
      });

    });
  });

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
      url: '/login',
      templateUrl: '/modules/login/login.html',
      controller: 'LoginCtrl'
    }).state('notificationsList', {
      url: '/list',
      templateUrl: '/modules/notifications-list/notifications-list.html',
      controller: 'NotificationsListCtrl'
    });

    $urlRouterProvider.otherwise('/login');
  });

})();
