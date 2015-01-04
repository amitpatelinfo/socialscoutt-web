'use strict';

/**
 * @ngdoc overview
 * @name socialscouttWebApp
 * @description
 * # socialscouttWebApp
 *
 * Main module of the application.
 */
angular
  .module('socialscouttWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login',{
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard',{
        url: '/dashboard',
        views:{
          '': {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
          },
          'accountView@dashboard': {
            templateUrl: 'views/menu.html'
          }
        }
      })
      .state('program',{
        url: '/program',
        views:{
          '': {
            templateUrl: 'views/program.html',
            controller: 'ProgramCtrl'
          },
          'accountView@dashboard': {
            templateUrl: 'views/menu.html'
          }
        }
      })

  });
