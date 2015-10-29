(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('LoginCtrl', function ($scope, $http, AuthService, API_URL) {
		console.log("Load LoginCtrl");

		$scope.submit = function () {

			$http.get(API_URL + '/users/profile/verify-email/5487252de4b0a21bdd60ee2d').then( function(response) {
				console.log(response.data);
			});

			console.log("Try login user " + $scope.email + " with password " + $scope.password);

		};

	});

})();
