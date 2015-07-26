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
      template: '<canvas class="windDirection" width="50" height="50"></canvas>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	function drawCanvas(direction) {
      		if(!isNaN(parseInt(direction))) {
      			var ctx = element[0].children[0].getContext('2d');
      			ctx.clearRect(0, 0, 50, 50);
      			ctx.fillStyle = 'rgb(54,54,54)';
           		ctx.strokeStyle = 'rgb(54,54,54)';
		        var h = 50;
		        var w = 50;
		        var aw = 10;
		        var ah = 10;
		        ctx.save();
		        ctx.translate(w/2, h/2);
		        ctx.rotate((Math.PI/180)*parseInt(direction));
		        ctx.translate(-w/2,-h/2);
		        ctx.moveTo(w/2,0);
		        ctx.lineTo(w/2,h-ah);
		        ctx.stroke();
		        ctx.beginPath();
		        ctx.moveTo((w/2)-(aw/2),h-ah);
		        ctx.lineTo((w/2)+(aw/2),h-ah);
		        ctx.lineTo(w/2,h);
		        ctx.fill();
		        ctx.restore();
      		}
      	}
      	attrs.$observe('direction', drawCanvas);
      }
    };
  });
