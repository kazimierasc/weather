'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:SinglecityCtrl
 * @description
 * # SinglecityCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('SinglecityCtrl', ['$scope','$resource','units','apiKey','prefferences',function ($scope,$resource,units,apiKey,prefferences) {
    $scope.name = 'Vilnius';
    $scope.latitude = '54.41';
    $scope.longitude = '25.17';
    $scope.temperature = 0;
    $scope.forecast = [];
    $scope.getUnit = prefferences.getUnit;
    var parameters = {
    	lat:$scope.latitude,
    	lon:$scope.longitude,
    	APPID:apiKey
    };

    var Weather = $resource('//api.openweathermap.org/data/2.5/weather');
    var weather = Weather.get(parameters, function() {
    	console.info('Current Info');
    	console.log(weather);
    	$scope.temperature = weather.main.temp;
    });

    var Forecast = $resource('//api.openweathermap.org/data/2.5/forecast');
    var forecast = Forecast.get(parameters, function() {
    	console.info('Forecast');
    	console.log(forecast);
    	$scope.forecast = forecast.list;
    });
    units.getTimezone(parameters,function(data) {
    	console.log(data);
    });

    var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function success(pos) {
	  var crd = pos.coords;
	  $scope.latitude = crd.latitude;
	  $scope.longitude = crd.longitude;
	  console.log('Your current position is:');
	  console.log('Latitude : ' + crd.latitude);
	  console.log('Longitude: ' + crd.longitude);
	  console.log('More or less ' + crd.accuracy + ' meters.');
	}

	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);

  }]);