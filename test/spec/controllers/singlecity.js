'use strict';

describe('Controller: SinglecityCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherApp'));

  var SinglecityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SinglecityCtrl = $controller('SinglecityCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
