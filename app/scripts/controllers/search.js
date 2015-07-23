'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('SearchCtrl', ['$scope','$location',function ($scope,$location) {
    $scope.keyword = "";
    $scope.performSearch = function() {
    	if($scope.keyword.length != 0) {
    		$location.path('/'+$scope.keyword);
    	}
    };
  }]);
