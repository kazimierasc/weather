'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('HeaderCtrl', ['$scope','requestprocessor','$location',function ($scope,requestprocessor,$location) {
    $scope.visibility = false;
    $scope.toggleMenu = function() {
    	$scope.visibility = !$scope.visibility;
    };
    $scope.coordinatesSeek = function() {
    	requestprocessor.deviceLocationLoad();
    };
    $scope.keyword = '';
    $scope.performSearch = function() {
    	$scope.toggleMenu();
    	if($scope.keyword.length !== 0) {
    		$location.path('/'+$scope.keyword);
    	}
    };
  }]);
