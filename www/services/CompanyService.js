(function(){
    "use strict";

    var app = angular.module('cradair');

    app.service('CompanyService', function ($http, $q, JBM) {
        var service = {};

        //Never used ?
        service.getSignals = function (companyId, size) {
            return $http.get(JBM.url + '/api/companies/' + companyId + '/signals', {params: {size: size}});
        };

        service.hasWebsite = function (company) {
            return angular.isDefined(company.website) && company.website !== null;
        };

        service.getBestSocialAccount = function (social) {
            // We get the best score and return the account associated
            var bestScore = Math.max.apply(Math, social.map(function (o) {
                return o.score;
            }));
            return social.filter(function (o) {
                return o.score === bestScore;
            })[0];
        };

        service.getBestSocialPicture = function (social) {
            // filter accounts without a social picture
            social = social.filter(function (account) {
                return angular.isDefined(account.score) && account.profilePictureUrl && account.profilePictureUrl.length > 0;
            });
            if (social.length === 0) {
                // If no account with a profile picture, we return an empty string
                return '';
            }
            return this.getBestSocialAccount(social).profilePictureUrl;
        };

        return service;
    });
})();
