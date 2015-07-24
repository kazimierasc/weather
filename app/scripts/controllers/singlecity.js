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
    $scope.getGeekMode = prefferences.getGeekMode;
    $scope.UTCoffset = 0;
    var parameters = {
        APPID:apiKey
    };
    $scope.setHome = function() {
        prefferences.setHome($scope.id);
        // @TODO Provide visual feedback
        alert("Home set");
    };
    // Create some useful resources
    var Weather = $resource('//api.openweathermap.org/data/2.5/weather');
    var Forecast = $resource('//api.openweathermap.org/data/2.5/forecast');
    
    // Create a function, that will choose a behaviour,
    // depending on the data available
    function init() {
        // Case if the location name is specified in the URI
        if($routeParams.locationName) {
            $scope.name = $routeParams.locationName;
            nameLoad();
        }
        // Case if there are coordinates specified in the URI 
        else if($routeParams.lat && $routeParams.lon) {
            $scope.lat = $routeParams.lat;
            $scope.lon = $routeParams.lon;
            coordinatesLoad();
        }
        // Case if the city ID from the openweathermap
        // database is specified in the URI
        else if($routeParams.id) {
            $scope.id = $routeParams.id;
            idLoad();
        }
        // Default case
        else {
            defaultLoad();
        }
        // Retrieves the current weather data
        getCurrentWeatherData(function() {
            // Does some additional lookup of the
            // timezone offset and assigns them to the model
            units.getTimezone({lat:$scope.lat, lon:$scope.lon}, function(location) {
                $scope.timezone = location;
                $scope.UTCoffset = location.rawOffset;
            });
        });
        // Retrieves the forecast data
        getForecastData();
    }

    // Create functions that customize API call
    // parameters depending on available data
    function nameLoad() {
        parameters.q = $scope.name;
    }

    function coordinatesLoad() {
        parameters.lat = $scope.lat;
        parameters.lon = $scope.lon;
    }

    function idLoad() {
        parameters.id = $scope.id;
    }

    function defaultLoad() {
        //TODO
        //Basic flow of operations should be
        //1. Ask for coordinates
        //2. Populate with home or default home
        var home = prefferences.getHome();
        console.log('current home',home);
        if(home) {
            parameters.id = home;
        } else {
            parameters.id = '593116';
        }
    }
    
    function getCurrentWeatherData(cb) {
        var weather = Weather.get(parameters, function() {
            $scope.id = weather.id;
            $scope.temperature = weather.main.temp;
            $scope.lat = weather.coord.lat;
            $scope.lon = weather.coord.lon;
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
            cb();
        });
    }

    function getForecastData() {
        var forecast = Forecast.get(parameters, function() {
            $scope.forecast = forecast.list;
            console.log(forecast.list);
        });
    }

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