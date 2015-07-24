'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('HeaderCtrl', function ($scope) {
    $scope.visibility = false;
    $scope.toggleMenu = function() {
    	$scope.visibility = !$scope.visibility;
    }
  });
