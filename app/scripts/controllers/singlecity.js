'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:SinglecityCtrl
 * @description
 * # SinglecityCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('SinglecityCtrl', ['$scope','$resource','units','prefferences','$routeParams','notice','requestprocessor',function ($scope,$resource,units,prefferences,$routeParams,notice,requestprocessor) {
    // Set some basic defaults
    $scope.temperature = 0;
    $scope.forecast = [];
    $scope.getUnit = prefferences.getUnit;
    $scope.getGeekMode = prefferences.getGeekMode;
    $scope.UTCoffset = 0;

    $scope.homeButtonValue = function() {
        if(prefferences.getHome() === $scope.id) {
            return 'Home location';
        } else {
            return 'Set as home';
        }
    };
    $scope.favoriteButtonValue = function() {
        if(prefferences.isFavorite($scope.id)) {
            return '★';
        } else {
            return '☆';
        }
    };
    $scope.homeButtonClass = function() {
        if(prefferences.getHome() === $scope.id) {
            return 'active';
        } else {
            return '';
        }
    };
    $scope.favoriteButtonClass = function() {
        if(prefferences.isFavorite($scope.id)) {
            return 'active';
        } else {
            return '';
        }
    };
    $scope.toggleFavoriteState = function() {
        prefferences.toggleFavoriteState($scope.id,$scope.name,$scope.country);
    };

    $scope.setHome = function() {
        var no = function() {
            notice.close();
        };
        if(prefferences.getHome() !== $scope.id) {
            var yes = function() {
                prefferences.setHome($scope.id);
                notice.close();
            };
            notice.title = 'Do you want to set '+$scope.name+' as the default location?';
            notice.description = 'This means that whenever you visit this page '+$scope.name+' will be the one you see.';
            notice.actions = [{name:'Yes',action:yes},{name:'No',action:no}];
            notice.visible = true;
        } else {
            var yes = function() {
                prefferences.setHome(false);
                notice.close();
            };
            notice.title = 'Do you want for '+$scope.name+' to no longer be your home location?';
            notice.description = 'This means that we will load weather for your coodinates or a default location, whenever you visit this page.';
            notice.actions = [{name:'Yes',action:yes},{name:'No',action:no}];
            notice.visible = true;
        }
        
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
            },dataRetrievalError);
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
            requestprocessor.nameLoad($scope.name,proceed);
        }
        // Case if there are coordinates specified in the URI 
        else if($routeParams.lat && $routeParams.lon) {
            $scope.lat = $routeParams.lat;
            $scope.lon = $routeParams.lon;
            requestprocessor.coordinatesLoad($scope.lat,$scope.lon,proceed);
        }
        // Case if the city ID from the openweathermap
        // database is specified in the URI
        else if($routeParams.locationId) {
            $scope.id = $routeParams.locationId;
            requestprocessor.idLoad($scope.id,proceed);
        }
        // Default case
        else {
            requestprocessor.defaultLoad(proceed);
        }
    }

    function dataRetrievalError() {
        /*var close = function() {
            notice.close();
        };*/
        notice.title = 'Ooops ...';
        notice.description = 'It appears that we have no idea what the weather is. We\'ll try to figure it out, come back to us later!';
        notice.actions = [];
        //notice.actions = [{name:'Shame',action:close}];
        notice.visible = true;
    }

    // Retrieves the current weather data 
    // and populates the scope with it
    function getCurrentWeatherData(cb) {
        var weather = Weather.get(requestprocessor.parameters, function() {
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
        },dataRetrievalError);
    }
    
    // Retrieves the weather forecast data
    // and adds it to the scope
    function getForecastData() {
        var forecast = Forecast.get(requestprocessor.parameters, function() {
            $scope.forecast = forecast.list;
        },dataRetrievalError);
    }

    // Does everything
    init();
    
  }]);