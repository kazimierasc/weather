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
  	var notice = {};
  	notice.visible = false;
	notice.title = '';
	notice.description = '';
	notice.actions = [];
	notice.close = function() {
		notice.visible = false;
	};
  	return notice;
  });
