'use strict';

describe('Filter: forecastDay', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var forecastDay;
  beforeEach(inject(function ($filter) {
    forecastDay = $filter('forecastDay');
  }));

  it('should return the input prefixed with "forecastDay filter:"', function () {
    var text = 'angularjs';
    expect(forecastDay(text)).toBe('forecastDay filter: ' + text);
  });

});
