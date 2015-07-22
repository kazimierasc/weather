'use strict';

/**
 * @ngdoc service
 * @name weatherApp.units
 * @description
 * # units
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('units', function () {
  	var kToF = function(k) {
  		return 1.8*(k-273)+32;
  	};
  	var kToC = function(k) {
  		return k-273;
  	};
  	
  	return {
  		kToF:kToF,
  		kToC:kToC
  	};
  });
