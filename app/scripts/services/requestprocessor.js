'use strict';

/**
 * @ngdoc service
 * @name weatherApp.requestprocessor
 * @description
 * # requestprocessor
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('requestprocessor', ['$rootScope','prefferences','apiKey','$location',function ($rootScope,prefferences,apiKey,$location) {
  	var instance = {};

    function resetInstance() {
      delete instance.parameters.q;
      delete instance.parameters.lat;
      delete instance.parameters.lon;
      delete instance.parameters.id;
    }

  	instance.parameters = {
        APPID:apiKey
    };

  	// Create functions that customize API call
    // parameters depending on available data
    instance.nameLoad = function(name,cb) {
        resetInstance();
        instance.parameters.q = name;
        cb();
    };

    instance.coordinatesLoad = function(lat,lon,cb) {
        resetInstance();
        instance.parameters.lat = lat;
        instance.parameters.lon = lon;
        cb();
    };

    instance.idLoad = function(id,cb) {
        resetInstance();
        instance.parameters.id = id;
        cb();
    };

    instance.deviceLocationLoad = function() {
        function success(pos) {
          $location.path('/coordinates/'+pos.coords.latitude+'/'+pos.coords.longitude);
          $rootScope.$apply();
        }
        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }
        var options = {
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
    };
    /*
    This function will attempt to get a predefined home location,
    if that one is not available, then it will attempt to get location data
    while loading the weather data of London (as fallback).
     */
    instance.defaultLoad = function(cb) {
        var home = prefferences.getHome();
        if(home) {
            instance.parameters.id = home;
            return cb();
        } else {
            instance.deviceLocationLoad();
            instance.parameters.id = '2643743';
            return cb();
        }
    };
    return instance;

  }]);
