'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:NoticeCtrl
 * @description
 * # NoticeCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('NoticeCtrl', ['$rootScope','$scope','notice',function ($rootScope,$scope,notice) {
	function updateNotice() {
		$scope.visible = notice.visible;
		$scope.title = notice.title;
		$scope.description = notice.description;
		$scope.actions = notice.actions;
	}
	$scope.$watch(function() {return notice.visible;}, updateNotice,true);
  }]);
