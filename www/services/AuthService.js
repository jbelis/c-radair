(function () {
    "use strict";

    var app = angular.module('cradair');

    app.factory('AuthService', function ($rootScope, $http, API_URL) {

        var user, userInfoPromise;

        function getUserInfo() {
            if (!userInfoPromise) {
                userInfoPromise = $http.get(API_URL + "/api/users/current/userInfo?timestamp=" + new Date().getTime())
					.then(function (response) {
                    user = response.data;
                    return user;
                }).finally(function () {
                    userInfoPromise = null;
                });
            }
            return userInfoPromise;
        }

        return {
			login: function(username, password) {
				return $http({
					method: 'POST',
					url: 'login-check',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: "j_username=" + username + "&j_password=" + password + "_spring_security_remember_me=1",
					ignoreAuthModule: true
				});
			},
            loginConfirmed: function () {
                $rootScope.$broadcast('event:auth-loginConfirmed');
            },
            loginRequired: function () {
                $rootScope.$broadcast('event:auth-loginRequired');
            },
            getUserInfo: getUserInfo,
            isUserDefined: function () {
                return angular.isDefined(user);
            },
            getLoggedUser: function () {
                return user;
            }
        };
    });
})();
