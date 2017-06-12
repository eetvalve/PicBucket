//requiraa sivun toimintaan tarvittavat kirjastot
window.$ = window.jQuery = require('jquery');
require('bootstrap');
var angular = require('angular');
require('angular-bootstrap-calendar');
require('angular-ui-bootstrap');
require('angular-ui-router');
var utf8 = require('utf8');
require('textangular/dist/textAngular-sanitize.min');
var textAngular = require('textangular');
var moment = require('moment');
require('angular-dynamic-locale');
var moment2 = require('moment-business-days');
require('ng-file-upload');

var ngFileSaver = require('angular-file-saver');




//controllers, requiree angularin sisÃ¤iset omatekemÃ¤t UUUDET moduulit
require('./main/mainController');
require('./search/searchController');
require('./navigation/navigationController');
require('./modal/uploadModalController');
require('./modal/deleteModalController');
require('./modal/tagModalController');
require('./modal/uploadModalDirective');

require('./app-services/flash.service');
require('./alert/alertService');
require('./account/index.controller');
require('./app-services/user.service');

//services
require('./services/imageService');
require('./services/searchService');

var app = angular.module('app', [ 'ui.bootstrap', 'ui.router', 'textAngular', 'ngFileUpload', 'ngFileSaver', 'mainctrl', 'searchctrl', 'navigationctrl', 'uploadmodalctrl',
    'uploadmodaldirective', 'imageService', 'deletemodalctrl', 'tagmodalctrl', 'searchService', 'Flash', 'alertService', 'Account', 'User']);


app.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/',
                views: {
                    '': {templateUrl: 'home.html'},
                    // the child views will be defined here (absolutely named)
                    'columnOne@home': {templateUrl: 'main/mainView.html'},
                    'columnTwo@home': {templateUrl: 'search/searchView.html'},
                    'columnThree@home': {templateUrl: 'navigation/navigationView.html'}
                    
                },
                data: {activeTab: 'home'}
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: {activeTab: 'account'}
            });
});

app.run(function($http, $rootScope, $window) {
    // add JWT token as default auth header
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

    // update active tab on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.activeTab = toState.data.activeTab;
    });
    
     
});
  $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });