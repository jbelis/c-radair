
(function() {

	"use strict";

	var app = angular.module('cradair');

	app.controller('NotificationsCtrl', function ($scope, $timeout, Push, $http, JBM, CompanyService) {

		$timeout(function() {
			$scope.registrationId = Push.getRegistrationId();
		}, 1000);

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
		}


	});


})();
