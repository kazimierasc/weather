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
      template: '<canvas class="cloudcover" width="50" height="50"></canvas>',
      restrict: 'E',
      scope: {
      	percentage:"@percentage"
      },
      link: function postLink(scope, element, attrs) {
      	console.log("percentage ",scope.percentage);
        var ctx = element[0].children[0].getContext("2d");
        ctx.fillStyle = "black";
        ctx.beginPath();
		ctx.moveTo(25,25)
		ctx.arc(25, 25, 25, 0, (2*Math.PI)-(parseInt(scope.percentage) * Math.PI)/180, true);
		ctx.fill();
      }
    };
  });
