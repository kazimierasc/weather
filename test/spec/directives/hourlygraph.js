'use strict';

describe('Directive: hourlyGraph', function () {

  // load the directive's module
  beforeEach(module('weatherApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hourly-graph></hourly-graph>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hourlyGraph directive');
  }));
});
