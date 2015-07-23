'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:winddirection
 * @description
 * # winddirection
 */
angular.module('weatherApp')
  .directive('winddirection', function () {
    return {
      template: '<canvas class="windDirection"></canvas>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var ctx = element[0].children[0].getContext("2d");
        ctx.fillStyle = "purple";
		ctx.fillRect(10, 10, 100, 100);
      }
    };
  });
