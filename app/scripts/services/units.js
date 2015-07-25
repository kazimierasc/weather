'use strict';

/**
 * @ngdoc service
 * @name weatherApp.units
 * @description
 * # units
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('units', ['$resource','timezoneApiKey',function ($resource,timezoneApiKey) {
  	var LocationResource = $resource('//api.geonames.org/timezoneJSON?lat=:lat&lng=:lon&username='+timezoneApiKey);
  	var getTimezone = function(parameters,cb,error) {
  		var location = LocationResource.get(parameters, function() {
  			cb(location);
  		},error);
  	};
  	return {
  		getTimezone:getTimezone
  	};
  }]);
