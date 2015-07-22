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
  .filter('temperature', ['prefferences',function (prefferences) {
    return function (k) {
    	var unit = prefferences.getUnit();
    	if(unit == 'F') {
    		return Math.round(1.8*(k-273)+32);
    	} else if(unit == 'C') {
    		return Math.round(k-273);
    	} else {
    		return Math.round(k);
    	}
    };
  }]);
