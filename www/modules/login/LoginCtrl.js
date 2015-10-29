(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('LoginCtrl', function ($scope, $http, AuthService, API_URL) {
		console.log("Load LoginCtrl");

		$scope.submit = function () {
			console.log("Try login user " + $scope.email + " with password " + $scope.password);
			AuthService.login($scope.username, $scope.password).then( function(response) {
				$state.go("notificationsList");
			}).catch(function(error) {
				console.log(error);
			});
		};

	});

})();
