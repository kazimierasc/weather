'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('HeaderCtrl', ['$scope','requestprocessor',function ($scope,requestprocessor) {
    $scope.visibility = false;
    $scope.toggleMenu = function() {
    	$scope.visibility = !$scope.visibility;
    };
    $scope.coordinatesSeek = function() {
    	requestprocessor.deviceLocationLoad();
    };
  }]);
