'use strict';

describe('Service: prefferences', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var prefferences;
  beforeEach(inject(function (_prefferences_) {
    prefferences = _prefferences_;
  }));

  it('should do something', function () {
    expect(!!prefferences).toBe(true);
  });

});
