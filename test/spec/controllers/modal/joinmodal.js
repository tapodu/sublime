'use strict';

describe('Controller: ModalJoinmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('sublimeApp'));

  var ModalJoinmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalJoinmodalCtrl = $controller('ModalJoinmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModalJoinmodalCtrl.awesomeThings.length).toBe(3);
  });
});
