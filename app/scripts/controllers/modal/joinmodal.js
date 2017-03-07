'use strict';

/**
 * @ngdoc function
 * @name sublimeApp.controller:ModalJoinmodalCtrl
 * @description
 * # ModalJoinmodalCtrl
 * Controller of the sublimeApp
 */
angular.module('sublimeApp')
  .controller('joinModalCtrl', [
    '$scope', 
    '$element', 
    'title', 
    'close', 
    function($scope, $element, title, close) {

    $scope.gameid = null;
    $scope.title = title;

    //  This close function doesn't need to use jQuery or bootstrap, because
    //  the button has the 'data-dismiss' attribute.
    $scope.close = function() {
        close({
        gameid: $scope.gameid,
      }, 500); // close, but give 500ms for bootstrap to animate
    };

    //  This cancel function must use the bootstrap, 'modal' function because
    //  the doesn't have the 'data-dismiss' attribute.
//    $scope.cancel = function() {
//
//      //  Manually hide the modal.
//      $element.modal('hide');
//
//      //  Now call close, returning control to the caller.
//      close({
//        gameid: $scope.gameid,
//      }, 500); // close, but give 500ms for bootstrap to animate
//    };
  }
]);
