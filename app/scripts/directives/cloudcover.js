'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:cloudcover
 * @description
 * # cloudcover
 */
angular.module('weatherApp')
  .directive('cloudcover', function () {
    return {
      template: '<canvas class="cloudcover"></canvas>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var ctx = element[0].children[0].getContext("2d");
        ctx.fillStyle = "yellow";
		ctx.fillRect(10, 10, 100, 100);
      }
    };
  });
