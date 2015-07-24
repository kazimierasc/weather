'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:titlecaps
 * @function
 * @description
 * # titlecaps
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('titlecaps', function () {
    return function (str) {
    	if(str) {
	    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    	}
    };
  });
