'use strict';

/**
 * @ngdoc overview
 * @name weatherApp
 * @description
 * # weatherApp
 *
 * Main module of the application.
 */
angular
  .module('weatherApp', ['ngResource','ngRoute','ngCookies'])
  .config(function($routeProvider, $locationProvider) {
  	$routeProvider
	  	.when('/', {
	  		templateUrl: 'views/main.html'
	  	})
	  	.when('/:locationName', {
	  		templateUrl: 'views/main.html'
	  	})
	  	.when('/id/:locationId', {
	  		templateUrl: 'views/main.html'
	  	})
	  	.when('/coordinates/:lat/:lon', {
	  		templateUrl: 'views/main.html'
	  	});
  });