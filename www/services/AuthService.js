(function () {
    "use strict";

    var app = angular.module('cradair');

	app.service("Store", function() {
		var s = window.localStorage["cradair"], _o = null;
		if (s) {
			try {
				_o = JSON.parse(s);
			} catch(e) {
				_o = {};
			}
		} else {
			_o = {};
		}

		var _save = function() {
			window.localStorage["cradair"] = JSON.stringify(_o);
		};

		return {
			get: function(name) {
				return _o[name];
			},
			set: function(name, value) {
				_o[name] = value;
				_save();
			},
			remove: function(name) {
				delete _o[name];
				_save();
			},
			clear: function() {
				_o = {};
				window.localStorage.removeItem("cradair");
			}
		}
	});


	app.factory('AuthService', function ($rootScope, $http, $q, Store, JBM, Push) {

        var user, userInfoPromise, initializedPromise = $q.defer();

		function login(username, password) {
			return $http({
				method: 'POST',
				url: JBM.url + '/login-check',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: "j_username=" + username + "&j_password=" + password + "&spring_security_remember_me=1",
				ignoreAuthModule: true
			}).then(function() {
				Store.set("username", username);
				Store.set("password", password);
				return true;
			});
		}

		function logout() {
			return $http({
				method: 'POST',
				url: JBM.url + '/logout'
			}).then(function() {
				Store.remove("password");
			});
		}

		function getUserInfo() {
            if (!userInfoPromise) {
                userInfoPromise = $http.get(JBM.url + "/api/users/current/userInfo?timestamp=" + new Date().getTime())
					.then(function (response) {
						user = response.data;
						initializedPromise.resolve(true);
						Push.init();
						return user;
					}).catch(function(error) {
						userInfoPromise = null;
						throw error;
					});
            }
            return userInfoPromise;
        }

		function init() {
			return getUserInfo().catch(function (error) {
				if (error.status === 401) {
					if (Store.get("password")) {
						return login(Store.get("username"), Store.get("password")).then(function () {
							return getUserInfo().catch(function (error) {
								if (error.status === 401) {
									Store.remove("password");
								} else {
									//alert(JSON.stringify(error));
								}
								initializedPromise.resolve(false);
								return false;
							});
						});
					} else {
						initializedPromise.resolve(false);
						return false;
					}
				} else {
					initializedPromise.resolve(false);
					//alert(JSON.stringify(error));
					return false;
				}
			});
		}

        return {
			init: init,
			login: login,
			logout: logout,
            getUserInfo: getUserInfo,
            isUserDefined: function () {
                return angular.isDefined(user);
            },
            getUser: function () {
                return user;
            },
			waitInitialized: function() {
				return initializedPromise.promise;
			}
        };
    });
})();
