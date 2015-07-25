'use strict';

describe('Service: requestprocessor', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var requestprocessor;
  beforeEach(inject(function (_requestprocessor_) {
    requestprocessor = _requestprocessor_;
  }));

  it('should do something', function () {
    expect(!!requestprocessor).toBe(true);
  });

});
