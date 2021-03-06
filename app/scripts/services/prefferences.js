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
      unit : 'C',
      geek : false,
      home : false,
      starred:{}
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
      if(prefferences.home) {
        return prefferences.home;
      } else {
        return false;
      }
    };
    var updateCookie = function() {
      $cookies.putObject(cookieKey,prefferences,{expires:new Date(new Date().getTime()+31536000000)});
    };
    var toggleGeekMode = function() {
      prefferences.geek = !prefferences.geek;
      updateCookie();
    };
    var getGeekMode = function() {
      if(prefferences.geek) {
        return prefferences.geek;
      } else {
        return false;
      }
    };
    var getStarred = function() {
      return prefferences.starred;
    };
    var toggleFavoriteState = function(id,name,country) {
      if(prefferences.starred[id]) {
        delete prefferences.starred[id];
      } else {
        prefferences.starred[id] = {name:name,country:country,id:id};
      }
      updateCookie();
    };
    var isFavorite = function(id) {
      return !!prefferences.starred[id];
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
      getGeekMode:getGeekMode,
      toggleGeekMode:toggleGeekMode,
  		setCelsius:setCelsius,
  		setFarenheit:setFarenheit,
      toggleFavoriteState:toggleFavoriteState,
      isFavorite:isFavorite,
      getStarred:getStarred
  	};
  }]);
