
(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('NotificationsCtrl', function ($scope, $timeout, $ionicSideMenuDelegate, $http, $ionicScrollDelegate, CompanyService, Push, JBM) {

		$scope.newNotifs = 0;
		$scope.signals = [];

		$timeout(function() {
			$scope.registrationId = Push.getRegistrationId();
		}, 1000);

		Push.addListener(function(notification) {
			$scope.newNotifs++;
			$scope.signals.unshift({
				indexedSignal: {
					company: {
						companyId: "FR-813159803",
						companyName: "AU VIEUX COMTOIS",
						companyTags: []
					},
					content: notification,
					id: "TWITTER:lecomtoiscom:660084883809656832:FR-813159803",
					indexationDate: new Date().getTime(),
					publicationDate: new Date().getTime(),
					signalId: "TWITTER:lecomtoiscom:660084883809656832",
					sourceId: "TWITTER:lecomtoiscom",
					sourceType: "TWITTER",
					title: null,
					url: "http://twitter.com/LeComtoisCom/status/660084883809656832"
				}
			});
			$scope.$apply();
		});

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
