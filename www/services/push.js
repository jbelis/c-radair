(function () {
	"use strict";

	var app = angular.module('cradair');

	app.service('Push', function ($ionicPush, $http, JBM) {
		var registrationId;
		var listeners = [];

		return {
			addListener: function(listenFunction) {
				listeners.push(listenFunction);
			},
			init: function () {
				$ionicPush.init({
					debug: true,
					onNotification: function (notification) {
						var payload = notification.payload;
						console.log("Notification received", notification, payload);
						listeners.forEach(function(l) {
							l(notification.text);
						});
					},
					"onRegister": function (data) {
						registrationId = data.token;
						//alert("Device token:" + JSON.stringify(data));
						// tell the server
						$http.put(JBM.url + "/api/users/profile/mobile/" + data.token).then(function() {
							console.log("Device token given to server");
						}).catch(function(error) {
							//alert(JSON.stringify(error));
						});

					},
					pluginConfig: {
						"ios": {
							"badge": true,
							"sound": true
						},
						"android": {
							"badge": true,
							"sound": true,
							"iconColor": "#343434"
						}
					}
				});

				try {
					$ionicPush.register();
				} catch(error) {
					alert(JSON.stringify(error));
				}
			},

			getRegistrationId: function () {
				return registrationId;
			}
		}
	});

})();
