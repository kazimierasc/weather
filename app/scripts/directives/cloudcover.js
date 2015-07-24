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
      link: function postLink(scope, element, attrs) {
      	function drawCanvas(percentage) {
          var ctx = element[0].children[0].getContext('2d');
          ctx.clearRect(0, 0, 50, 50);
      		if(!isNaN(parseInt(percentage))) {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            if(parseInt(percentage)>0) {
              ctx.moveTo(25,25);
              ctx.arc(25, 25, 25, 0, (360*(percentage/100))*(Math.PI/180), false);
              ctx.fill();
            } else {
              ctx.arc(25, 25, 25, 0, Math.PI*2);
              ctx.stroke();
            }
	      		
			    }
      	}
      	attrs.$observe('percentage', drawCanvas);
      }
    };
  });
