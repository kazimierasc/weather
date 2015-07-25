'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:SinglecityCtrl
 * @description
 * # SinglecityCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('SinglecityCtrl', ['$scope','$resource','units','apiKey','prefferences','$routeParams','notice',function ($scope,$resource,units,apiKey,prefferences,$routeParams,notice) {
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
        var yes = function() {
            prefferences.setHome($scope.id);
            notice.close();
        };
        var no = function() {
            notice.close();
        };
        notice.title = 'Do you want to set '+$scope.name+' as the default location?';
        notice.description = 'This means that whenever you load this page '+$scope.name+' will be the one you see.';
        notice.actions = [{name:'Yes',action:yes},{name:'No',action:no}];
        notice.visible = true;
    };
    // Create some useful resources
    var Weather = $resource('//api.openweathermap.org/data/2.5/weather');
    var Forecast = $resource('//api.openweathermap.org/data/2.5/forecast');
    

    // The function serves as a callback for conditional
    // processors (like the nameLoad, defaultLoad etc.)
    function proceed() {
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

    // Create a function, that will choose a behaviour,
    // depending on the data available
    function init() {
        // Case if the location name is specified in the URI
        if($routeParams.locationName) {
            $scope.name = $routeParams.locationName;
            nameLoad(proceed);
        }
        // Case if there are coordinates specified in the URI 
        else if($routeParams.lat && $routeParams.lon) {
            $scope.lat = $routeParams.lat;
            $scope.lon = $routeParams.lon;
            coordinatesLoad(proceed);
        }
        // Case if the city ID from the openweathermap
        // database is specified in the URI
        else if($routeParams.id) {
            $scope.id = $routeParams.id;
            idLoad(proceed);
        }
        // Default case
        else {
            defaultLoad(proceed);
        }
    }

    // Create functions that customize API call
    // parameters depending on available data
    function nameLoad(cb) {
        parameters.q = $scope.name;
        cb();
    }

    function coordinatesLoad(cb) {
        parameters.lat = $scope.lat;
        parameters.lon = $scope.lon;
        cb();
    }

    function idLoad(cb) {
        parameters.id = $scope.id;
        cb();
    }

    function deviceLocationLoad(cb) {
        console.log('called device location load');
        function success(pos) {
          var crd = pos.coords;
          delete parameters.q;
          delete parameters.id;
          parameters.lat = crd.latitude;
          parameters.lon = crd.longitude;
          cb();
        }
        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    function defaultLoad(cb) {
        var home = prefferences.getHome();
        if(home) {
            parameters.id = home;
            return cb();
        } else {
            deviceLocationLoad(cb);
            parameters.id = '593116';
            return cb();
        }
    }

    // Retrieves the current weather data 
    // and populates the scope with it
    function getCurrentWeatherData(cb) {
        console.log(parameters);
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
    
    // Retrieves the weather forecast data
    // and adds it to the scope
    function getForecastData() {
        var forecast = Forecast.get(parameters, function() {
            $scope.forecast = forecast.list;
        });
    }
    init();
  }]);