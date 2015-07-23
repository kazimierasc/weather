'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:time
 * @function
 * @description
 * # time
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('time', function () {
    return function (input,offset) {
    	return new Date((input+offset*3600)*1000).toJSON();
    };
  });