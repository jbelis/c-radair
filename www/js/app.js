(function () {
	"use strict";

	var app = angular.module('cradair', ['ionic']);

	app.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			var push = new Ionic.Push({
				"debug": true
			});

			push.register(function(token) {
				console.log("Device token:",token.token);
			});

		});
	});

	app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

		$stateProvider.state('main', {
			url: "/",
			controller: 'MainCtrl'
		}).state('login', {
			url: '/login',
			templateUrl: "/modules/login/login.html",
			controller: "LoginCtrl"
		}).state('notificationsList', {
			url: '/list',
			templateUrl: '/modules/notifications-list/notifications-list.html',
			controller: 'NotificationsCtrl'
		});

		$urlRouterProvider.otherwise('/');

		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	});

	app.constant('API_URL', 'http://10.1.1.163:8080/api');

	app.controller('MainCtrl', function ($scope, $state, $timeout, $window, AuthService) {

		$scope.isUserLogged = false;

		if (!AuthService.isUserDefined()) {
			AuthService.getUserInfo().then(function () {
				$state.go("notificationsList");
				$scope.isUserLogged = true;
			}).catch(function (error) {
				$state.go("login");
			});
		} else {
			$state.go("notificationsList");
			$scope.isUserLogged = true;
		}

		$scope.$state = $state;

	});

})();
