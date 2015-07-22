'use strict';

describe('Service: timezoneApiKey', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var timezoneApiKey;
  beforeEach(inject(function (_timezoneApiKey_) {
    timezoneApiKey = _timezoneApiKey_;
  }));

  it('should do something', function () {
    expect(!!timezoneApiKey).toBe(true);
  });

});
