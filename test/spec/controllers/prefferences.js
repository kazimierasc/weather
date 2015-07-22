'use strict';

describe('Controller: PrefferencesCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherApp'));

  var PrefferencesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrefferencesCtrl = $controller('PrefferencesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
