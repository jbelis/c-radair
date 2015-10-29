
(function() {

  "use strict";

  var app = angular.module('cradair');

  app.controller('NotificationsCtrl', function ($scope, $timeout, Push) {

    $timeout(function() {
      $scope.registrationId = Push.getRegistrationId();
    }, 1000)

    console.log("Load NotificationsCtrl");
  });


})();
