
(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('NotificationsCtrl', function ($scope, $timeout, Push, $http, JBM) {

		$timeout(function() {
			$scope.registrationId = Push.getRegistrationId();
		}, 1000);

		$http.post(JBM.url + "/api/signals/search?q=+tags:(MONEY+OR+EVENT+OR+JOB+OR+PEOPLE+OR+NEWS+OR+PRODUCT)").then( function(response) {
			$scope.signals = response.data.results;
			console.log($scope.signals);
		});

		console.log("Load NotificationsCtrl");
	});


})();
