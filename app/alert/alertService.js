angular
        .module('alertService', [])
        .factory('alertService', function ($rootScope) {
    var alertService = {};

    // create an array of alerts available globally
    $rootScope.alertss = [];

    alertService.add = function (type, msg) {
        $rootScope.alertss.push({'type': type, 'msg': msg});
    };

    alertService.closeAlert = function (index) {
        $rootScope.alertss.splice(index, 1);
    };

    return alertService;
 });