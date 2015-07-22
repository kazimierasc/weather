'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:SinglecityCtrl
 * @description
 * # SinglecityCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('SinglecityCtrl', ['$scope','$resource','units',function ($scope,$resource,units) {
    $scope.name = 'Vilnius';
    $scope.latitude = '54.41';
    $scope.longitude = '25.17';
    $scope.temperature = 0;
    var location = {
    	lat:$scope.latitude,
    	lon:$scope.longitude
    };
    var Weather = $resource('//api.openweathermap.org/data/2.5/weather?lat=:lat&lon=:lon');
    var weather = Weather.get(location, function() {
    	$scope.temperature = units.kToC(weather.main.temp);
    });

    var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function success(pos) {
	  var crd = pos.coords;

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