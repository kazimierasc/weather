'use strict';

/**
 * @ngdoc service
 * @name weatherApp.prefferences
 * @description
 * # prefferences
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('prefferences', function () {
  	var unit = 'C';
  	var setCelsius = function() {
  		unit = 'C';
  	};
  	var setFarenheit = function() {
  		unit = 'F';
  	};
  	var getUnit = function() {
  		return unit;
  	};
  	return {
  		getUnit:getUnit,
  		setCelsius:setCelsius,
  		setFarenheit:setFarenheit
  	};
  });
