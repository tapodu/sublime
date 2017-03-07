'use strict';

/**
 * @ngdoc function
 * @name sublimeApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the sublimeApp
 */
angular.module('sublimeApp')
  .controller('JoinCtrl', [
    'SocketService', 
    '$stateParams',
    'ModalService',
    '$scope',
    '$state',
    function (SocketService, $stateParams, ModalService, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.player = 'O';
    $scope.gameid = $stateParams.gameid;
    SocketService.connect();
    
    if ($stateParams.gameid){
      $state.go('join.game');
    } else {
      ModalService.showModal({
        templateUrl: "views/modal/joinmodal.html",
        controller: "joinModalCtrl",
        inputs: {
          title: "Enter a GameId to join the game"
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          $state.go('join.game', {'gameid':result.gameid});
        });
      });
    }
}]);
