'use strict';

describe('Filter: forecastHours', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var forecastHours;
  beforeEach(inject(function ($filter) {
    forecastHours = $filter('forecastHours');
  }));

  it('should return the input prefixed with "forecastHours filter:"', function () {
    var text = 'angularjs';
    expect(forecastHours(text)).toBe('forecastHours filter: ' + text);
  });

});
