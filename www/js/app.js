(function () {
	"use strict";

	var app = angular.module('cradair', ['ionic', 'ionic.service.core', 'ionic.service.push']);

	app.run(function ($ionicPlatform, Push, JBM, AuthService) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			if (!window.cordova) {
				JBM.url = "http://localhost:5050";
			} else {
				JBM.url = "http://10.1.1.163:8080";
			}

			AuthService.init().then(function(result) {
				console.log("Auth Service Initialized", result);
			});
		});
	});

	app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

		$stateProvider.state('main', {
			url: "/",
			controller: 'MainCtrl'
		}).state('login', {
			url: '/login',
			templateUrl: "modules/login/login.html",
			controller: "LoginCtrl"
		}).state('notificationsList', {
			url: '/list',
			templateUrl: 'modules/notifications-list/notifications-list.html',
			controller: 'NotificationsCtrl'
		});

		$urlRouterProvider.otherwise('/');

		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	});

	app.value("JBM", {
		url: "http://10.1.1.163:8080"
	});

	app.controller('MainCtrl', function ($scope, $state, $timeout, $window, AuthService, JBM) {

		$scope.isUserLogged = false;

		AuthService.waitInitialized().then(function(result) {
			console.log("Auth Service Initialized fron controller", result);
			AuthService.getUserInfo().then(function () {
				$state.go("notificationsList");
				$scope.isUserLogged = true;
			}).catch(function(error) {
				$state.go("login");
			});
		});

		$scope.$state = $state;

	});

})();
