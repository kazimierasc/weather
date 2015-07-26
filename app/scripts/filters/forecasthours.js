'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:forecastHours
 * @function
 * @description
 * # forecastHours
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('forecastHours', function () {
    return function (input) {
    	return (input.getHours())+':00';
    };
  });
