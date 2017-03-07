'use strict';

describe('Controller: JoinmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('sublimeApp'));

  var JoinmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JoinmodalCtrl = $controller('JoinmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JoinmodalCtrl.awesomeThings.length).toBe(3);
  });
});
