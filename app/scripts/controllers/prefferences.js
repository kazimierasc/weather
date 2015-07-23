'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:PrefferencesCtrl
 * @description
 * # PrefferencesCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('PrefferencesCtrl', ['$scope','prefferences',function ($scope,prefferences) {
    $scope.setCelsius = prefferences.setCelsius;
    $scope.setFarenheit = prefferences.setFarenheit;
    $scope.toggleGeekMode = prefferences.toggleGeekMode;
  }]);