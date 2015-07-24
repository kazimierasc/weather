'use strict';

describe('Filter: titlecaps', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var titlecaps;
  beforeEach(inject(function ($filter) {
    titlecaps = $filter('titlecaps');
  }));

  it('should return the input prefixed with "titlecaps filter:"', function () {
    var text = 'angularjs';
    expect(titlecaps(text)).toBe('titlecaps filter: ' + text);
  });

});
