
(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('NotificationsCtrl', function ($scope, $timeout, $ionicSideMenuDelegate, $http, CompanyService, Push, JBM) {

		$timeout(function() {
			$scope.registrationId = Push.getRegistrationId();
		}, 1000);

		Push.addListener(function(notification) {
			alert("notification received: " + JSON.stringify(notification));
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
					tags: Array[1],
					title: null,
					url: "http://twitter.com/LeComtoisCom/status/660084883809656832"
				}
			});
		});

		$http.post(JBM.url + "/api/signals/search?q=+tags:(MONEY+OR+EVENT+OR+JOB+OR+PEOPLE+OR+NEWS+OR+PRODUCT)").then( function(response) {
			$scope.signals = response.data.results;
			console.log($scope.signals);
		});

		$scope.selectPicture = function (companyId) {

			//var pic;
			//if (CompanyService.hasWebsite(company) && company.website.social) {
			//	if (company.website.social.facebook && company.website.social.facebook.length) {
			//		pic = CompanyService.getBestSocialPicture(company.website.social.facebook);
			//		if (pic.length > 0) {
			//			return pic;
			//		}
			//	}
			//	if (company.website.social.twitter && company.website.social.twitter.length) {
			//		pic = CompanyService.getBestSocialPicture(company.website.social.twitter);
			//		if (pic.length > 0) {
			//			return pic;
			//		}
			//	}
			//}
			//if (CompanyService.hasWebsite(company) && company.website.url) {
			//	return "/api/fullcompanies/" + company.id + "/screenshot";
			//}
			return "img/default-company.png";

		};

		$scope.remove = function (notificationIdx) {
			$scope.signals.splice(notificationIdx,1);
		};

		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};


	});


})();
