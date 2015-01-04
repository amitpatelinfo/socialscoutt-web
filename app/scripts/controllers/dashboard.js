'use strict';
/* jshint unused:false */
/**
 * @ngdoc function
 * @name socialscouttWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the socialscouttWebApp
 */
angular.module('socialscouttWebApp')
  .controller('DashboardCtrl', function ($scope, loginService) {
    //Check if User is logged In else redirect to login page
    if(!loginService.isUserLoggedIn()){
      loginService.changeState('login');
    }

    //controller logic
    $scope.createProgram = function(){
      loginService.changeState('program');
    }
  });
