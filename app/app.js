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


//requiree angularin sisÃ¤iset omatekemÃ¤t UUUDET moduulit
require('./main/mainController');
require('./search/searchController');
require('./navigation/navigationController');
require('./modal/uploadModalController');
require('./modal/uploadModalDirective');

var app = angular.module('app', [ 'ui.bootstrap', 'ui.router', 'textAngular', 'ngFileUpload', 'mainctrl', 'searchctrl', 'navigationctrl', 'uploadmodalctrl',
    'uploadmodaldirective']);


app.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                views: {
                    '': {templateUrl: 'home.html'},
                    // the child views will be defined here (absolutely named)
                    'columnOne@home': {templateUrl: 'main/mainView.html'},
                    'columnTwo@home': {templateUrl: 'search/searchView.html'},
                    'columnThree@home': {templateUrl: 'navigation/navigationView.html'}
                    
                },
                data: {activeTab: 'home'}
            });
});
