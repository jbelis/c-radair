(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('LoginCtrl', function ($scope, $http, AuthService) {
		console.log("Load LoginCtrl");

		$scope.submit = function () {

			$http.get('/api/users/profile/current').then( function(response) {
				console.log(response.data);
			});

			console.log("Try login user " + $scope.email + " with password " + $scope.password);

		};

	});

})();
