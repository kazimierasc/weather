'use strict';
/* global d3 */
/**
 * @ngdoc directive
 * @name weatherApp.directive:hourlyGraph
 * @description
 * # hourlyGraph
 */
angular.module('weatherApp')
  .directive('hourlyGraph', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
      	forecast:'=forecast',
      	offset:'=offset'
      },
      link: function postLink(scope, element, attrs) {
      	function convertTemperature(k,unit) {
      		if(unit === 'F') {
	    		return Math.round(1.8*(k-273)+32);
	    	} else if(unit === 'C') {
	    		return Math.round(k-273);
	    	}
      	}
      	
      	var temperature = [];
      	var day = [];
      	var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      	var unit;
      	var hTickScarcity = 5;
      	function drawGraph() {
      		if(temperature.length === 0) {
      			return false;
      		}
	      	var margin = {top:50, right:50, bottom:50, left:50};
	      	var width,height;
			if(window.innerHeight<=window.innerWidth) {
				height = (2/3)*window.innerHeight - margin.top - margin.bottom;
			} else {
				height = (2/3)*window.innerWidth - margin.top - margin.bottom;
			}
			
			if(window.innerWidth <= 500) {
				width = window.innerWidth - margin.left - margin.right;
				hTickScarcity = 7;
			} else if(window.innerWidth <= 1000) {
				width = window.innerWidth*0.8 - margin.left - margin.right;
				hTickScarcity = 5;
			} else {
				width = window.innerWidth*0.5 - margin.left - margin.right;
				hTickScarcity = 3;
			}

			var tooltip = d3.select('body').append('div')
				.style('position','absolute')
				.style('padding', '0 10px')
				.style('background', 'white')
				.style('opacity',0);

			var yScale = d3.scale.linear()
				.domain([d3.min(temperature)-5,d3.max(temperature)])
				.range([0,height]);

			var xScale = d3.scale.ordinal()
				.domain(d3.range(0, day.length))
				.rangeBands([0,width],0.2);

			var colors = d3.scale.linear()
				.domain([d3.min(temperature)-5,d3.max(temperature)])
				.range(['rgb(131,191,23)','rgb(241,93,88)']);
			d3.select(element[0].children[0]).html('');

	      	d3.select(element[0].children[0])
	      		.append('svg')
	      		.attr('id','hourlyGraph')
				.attr('width',width + margin.left + margin.right)
				.attr('height',height + margin.top + margin.bottom)
				.append('g')
				.attr('transform','translate('+margin.left+','+margin.top+')')
				.selectAll('rect').data(temperature).enter()
					.append('rect')
					.style('fill',function(d) {
						return colors(d);
					})
					.attr('width',xScale.rangeBand())
					.attr('height',function(d) {
						return yScale(d);
					})
					.attr('x', function(d,i) {
						return xScale(i);
					})
					.attr('y', function(d) {
						return height-yScale(d);
					})
					.on('mouseover', function(d,i) {
						tooltip.transition()
							.style('opacity', 0.9);
						tooltip.html(d + '&deg;'+unit+' on '+daysOfWeek[new Date(day[i]).getDay()]+' '+(new Date(day[i]).getMonth()+1)+'-'+(new Date(day[i]).getDate())+' '+new Date(day[i]).getHours()+':00')
							.style('left',d3.event.pageX + 'px')
							.style('top', d3.event.pageY-30 + 'px');
						d3.select(this)
							.style('opacity', 0.5);
					})
					.on('mouseout', function() {
						d3.select(this)
							.style('opacity', 1);
					});
			var vGuideScale = d3.scale.linear()
				.domain([d3.min(temperature)-5, d3.max(temperature)])
				.range([height,0]);

			var vAxis = d3.svg.axis()
				.scale(vGuideScale)
				.orient('left')
				.ticks(10);

			var vGuide = d3.select('svg#hourlyGraph').append('g');

			vAxis(vGuide);
			vGuide.attr('transform','translate('+margin.left+','+margin.top+')');
			vGuide.selectAll('path').style({fill:'none', stroke:'rgb(54,54,54)'});
			vGuide.selectAll('line').style({stroke:'rgb(54,54,54)'});

			var hAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.tickValues(xScale.domain().filter(function(d){
					if(d === 0) {
						return true;
					} else if(d%hTickScarcity === 0) {
						return true;
					} else {
						return false;
					}
				}))
				.tickFormat(function(d) {
					if(day[d]) {
						return new Date(day[d]).getHours()+':00';
					}
				});

			var hGuide = d3.select('svg#hourlyGraph').append('g');
			hAxis(hGuide);
			hGuide.attr('transform','translate('+margin.left+','+(height + margin.top)+')');
			hGuide.selectAll('path').style({fill:'none', stroke:'rgb(54,54,54)'});
			hGuide.selectAll('line').style({stroke:'rgb(54,54,54)'});

			d3.select('svg#hourlyGraph')
				.append('text')
				.attr('x',10)
				.attr('y',30)
				.html('&deg;'+unit);
		}
		function parseData() {
  			temperature = [];
  			day = [];
  			if(attrs.unit === 'C' || attrs.unit === 'F') {
  				unit = attrs.unit;
  			} else {
  				unit = 'C';
  			}
  			for (var i = 0; i < scope.forecast.length; i++) {
  				temperature.push(convertTemperature(scope.forecast[i].main.temp,unit));
  				day.push((scope.forecast[i].dt+scope.offset*3600)*1000);
  			}
  			drawGraph();
  		}
		scope.$watch(function() {return scope.forecast+scope.offset+attrs.unit;},parseData);
      	window.addEventListener("orientationchange",drawGraph,true);
      }
    };
  });