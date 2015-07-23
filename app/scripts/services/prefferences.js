'use strict';

/**
 * @ngdoc service
 * @name weatherApp.prefferences
 * @description
 * # prefferences
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('prefferences', ['$cookies',function ($cookies) {
    var cookieKey = 'weatherAppPrefferences';
  	var prefferences = {};

    var defaultPrefferences = {
      unit : 'C'
    };
  	var setCelsius = function() {
  		prefferences.unit = 'C';
      updateCookie();
  	};
  	var setFarenheit = function() {
  		prefferences.unit = 'F';
      updateCookie();
  	};
    var setHome = function(home) {
      prefferences.home = home;
      updateCookie();
    };
  	var getUnit = function() {
  		return prefferences.unit;
  	};
    var getHome = function() {
      return prefferences.home || false;
    };
    var updateCookie = function() {
      $cookies.putObject(cookieKey,prefferences,{expires:new Date(new Date().getTime()+31536000000)});
    };
    var existingPrefferences = $cookies.getObject(cookieKey);

    if(existingPrefferences) {
      for(var key in defaultPrefferences) {
        if(existingPrefferences[key]) {
          defaultPrefferences[key] = existingPrefferences[key];
        }
      }
    }
    prefferences = defaultPrefferences;


  	return {
  		getUnit:getUnit,
      setHome:setHome,
      getHome:getHome,
  		setCelsius:setCelsius,
  		setFarenheit:setFarenheit
  	};
  }]);
