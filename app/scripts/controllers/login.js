'use strict';

/**
 * @ngdoc function
 * @name socialscouttWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialscouttWebApp
 */
angular.module('socialscouttWebApp')
  .controller('LoginCtrl', function ($scope, $log, $state, loginService) {

    $scope.login = function(){
      $scope.loginWith = event.currentTarget.dataset.value;
      $log.log('login Service called with -- ' + $scope.loginWith);
      var promise = loginService.login($scope.loginWith);
      promise.then(function (result) {
        loginService.userDetail = result.userDetail;
        loginService.changeState('dashboard');
      });
    };
  });
