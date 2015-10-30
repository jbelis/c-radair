(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('LoginCtrl', function ($scope, $state, $http, AuthService) {
		console.log("Load LoginCtrl");
		$scope.u = {};

		$scope.submit = function () {
			$scope.authError = false;
			$scope.otherError = false;
			alert("Try login user " + $scope.u.username + " with password " + $scope.u.password);
			AuthService.login($scope.u.username, $scope.u.password).then(function(response) {
				AuthService.getUserInfo().then(function() {
					alert("going to notifications list");
					$state.go("notificationsList");
				});
			}).catch(function(error) {
				alert(JSON.stringify(error));
				if (error.status == 401) {
					$scope.authError = true;
				} else {
					$scope.otherError = true;
					console.log(error);
				}
			});
		};
	});
})();
