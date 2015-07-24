'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:forecastDay
 * @function
 * @description
 * # forecastDay
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('forecastDay', function () {
    return function (input) {
    	var daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    	return daysOfWeek[input.getDay()]+' '+(input.getMonth()+1)+'-'+(input.getDate());
    };
  });
