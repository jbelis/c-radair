(function () {
	"use strict";

	var app = angular.module('cradair');

	app.service('Push', function ($ionicPush, $http, JBM) {
		var registrationId;

		return {
			init: function () {
				$ionicPush.init({
					debug: true,
					onNotification: function (notification) {
						var payload = notification.payload;
						alert(payload);
						console.log("Notification received", notification, payload);
					},
					"onRegister": function (data) {
						registrationId = data.token;
						console.log("Device token:", data.token);
						// tell the server
						$http.put(JBM.url + "/api/users/profile/mobile/" + data.token).then(function() {
							console.log("Device token given to server");
						}).catch(function(error) {
							alert(JSON.stringify(error));
						});

					},
					pluginConfig: {
						"ios": {
							"badge": true,
							"sound": true
						},
						"android": {
							"iconColor": "#343434"
						}
					}
				});

				$ionicPush.register();
			},

			getRegistrationId: function () {
				return registrationId;
			}
		}
	});

})();
