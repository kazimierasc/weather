'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:PrefferencesCtrl
 * @description
 * # PrefferencesCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('PrefferencesCtrl', ['$scope','prefferences','$location',function ($scope,prefferences,$location) {
    $scope.setCelsius = prefferences.setCelsius;
    $scope.setFarenheit = prefferences.setFarenheit;
    $scope.toggleGeekMode = prefferences.toggleGeekMode;
    $scope.starred = prefferences.getStarred;
    $scope.goToId = function(id) {
        $scope.toggleStarredList();
    	$location.path('/id/'+id);
    };
    $scope.starredListStatus = 'contracted';
    $scope.toggleStarredList = function() {
    	if($scope.starredListStatus === 'expanded') {
    		$scope.starredListStatus = 'contracted';
    	} else {
    		$scope.starredListStatus = 'expanded';
    	}
    };
    $scope.displayStarredList = function() {
        if(Object.keys($scope.starred()).length > 0) {
            console.log('yes')
            return true;
        } else {
            return false;
        }
    };
  }]);