'use strict';

/**
 * @ngdoc service
 * @name weatherApp.notice
 * @description
 * # notice
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .factory('notice', function () {
  	var self = {};
  	self.visible = false;
	self.title = '';
	self.description = '';
	self.actions = [];
	self.close = function() {
		self.visible = false;
	};
  	return self;
  });
