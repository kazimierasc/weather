'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:temperature
 * @function
 * @description
 * # temperature
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('temperature', function () {
    return function (k,unit,symbol) {
    	if(unit == 'F') {
    		return Math.round(1.8*(k-273)+32) + '°' + unit;
    	} else if(unit == 'C') {
    		return Math.round(k-273) + '°' + unit;
    	} else {
    		return Math.round(k) + 'K';
    	}
    };
  });
