
(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('NotificationsCtrl', function ($scope, $timeout, $ionicSideMenuDelegate, $http, $ionicScrollDelegate, CompanyService, Push, JBM) {

		$timeout(function() {
			$scope.registrationId = Push.getRegistrationId();
		}, 1000);

		$timeout(function() {
			$scope.newNotifs = 5;
		}, 5000);

		$http.post(JBM.url + "/api/signals/search?q=+tags:(MONEY+OR+EVENT+OR+JOB+OR+PEOPLE+OR+NEWS+OR+PRODUCT)").then( function(response) {
			$scope.signals = response.data.results;
			console.log($scope.signals);
		});

		$scope.selectPicture = function (companyId) {
			return "img/default-company.png";
		};

		$scope.remove = function (notificationIdx) {
			$scope.signals.splice(notificationIdx,1);
		};

		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};

		$scope.viewNewNotifications = function() {
			$scope.newNotifs = 0;
			$ionicScrollDelegate.scrollTop(true);
		}


	});


})();
