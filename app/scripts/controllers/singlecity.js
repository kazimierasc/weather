'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:SinglecityCtrl
 * @description
 * # SinglecityCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('SinglecityCtrl', ['$scope','$resource','units','apiKey','prefferences','$routeParams',function ($scope,$resource,units,apiKey,prefferences,$routeParams) {
    // Set some basic defaults
    $scope.temperature = 0;
    $scope.forecast = [];
    $scope.getUnit = prefferences.getUnit;
    $scope.UTCoffset = 0;

    var parameters = {
        APPID:apiKey
    };
    // Create some useful resources
    var Weather = $resource('//api.openweathermap.org/data/2.5/weather');
    var Forecast = $resource('//api.openweathermap.org/data/2.5/forecast');
    
    // Create a function, that will choose a behaviour,
    // depending on the data available
    function init() {
        if($routeParams.locationName) {
            $scope.name = $routeParams.locationName;
            nameLoad();
        } else if($routeParams.lat && $routeParams.lon) {
            $scope.lat = $routeParams.lat;
            $scope.lon = $routeParams.lon;
            coordinatesLoad();
        } else if($routeParams.id) {
            $scope.id = $routeParams.id;
            idLoad();
        } else {
            defaultLoad();
        }
        getCurrentWeatherData();
        getForecastData();
    }

    // Create functions that customize API call
    // parameters depending on available data
    function nameLoad() {
        parameters.q = $scope.name;
    }

    function coordinatesLoad() {
        parameters.lat = $scope.latitude;
        parameters.lon = $scope.longitude;
    }

    function idLoad() {
        parameters.id = $scope.id;
    }

    function defaultLoad() {
        var home = prefferences.getHome();
        if(home) {
            parameters.id = home;
        } else {
            parameters.id = "593116";
        }
    }
    
    function getCurrentWeatherData() {
        var weather = Weather.get(parameters, function() {
            $scope.id = weather.id;
            $scope.temperature = weather.main.temp;
            $scope.latitude = weather.coord.lat;
            $scope.longitude = weather.coord.lon;
            $scope.name = weather.name;
            $scope.humidity = weather.main.humidity;
            $scope.pressure = weather.main.pressure;
            $scope.country = weather.sys.country;
            $scope.visibility = weather.visibility;
            $scope.description = weather.weather[0].description;
            $scope.word = weather.weather[0].main;
            $scope.icon = weather.weather[0].icon;
            $scope.windDegrees = weather.wind.deg;
            $scope.windSpeed = weather.wind.speed;
            $scope.cloudiness = weather.clouds.all;
        });
    }

    function getForecastData() {
        var forecast = Forecast.get(parameters, function() {
            $scope.forecast = forecast.list;
        });
    }

    /*units.getTimezone(parameters,function(data) {
    	console.log(data);
    });*/

    /*
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

	navigator.geolocation.getCurrentPosition(success, error, options);*/
    init();
  }]);