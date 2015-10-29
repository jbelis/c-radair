(function () {
    "use strict";

    var app = angular.module('cradair');

    app.factory('AuthService', function ($rootScope, $http) {

        var user, userInfoPromise;

        function getUserInfo() {
            if (!userInfoPromise) {
                userInfoPromise = $http.get("api/users/current/userInfo?timestamp=" + new Date().getTime()).then(function (response) {
                    user = response.data;
                    return user;
                }).finally(function () {
                    userInfoPromise = null;
                });
            }
            return userInfoPromise;
        }

        return {
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
