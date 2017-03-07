'use strict';

/**
 * @ngdoc function
 * @name sublimeApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the sublimeApp
 */
angular.module('sublimeApp')
  .controller('ViewCtrl', [
    'SocketService',
    '$scope',
    'ModalService',
    '$stateParams',
    '$state',
    function (SocketService, $scope, ModalService, $stateParams, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.player = 'V';
    $scope.gameid = $stateParams.gameid;

    SocketService.connect();
    
    if ($stateParams.gameid){
      $state.go('view.game');
    } else {
      ModalService.showModal({
        templateUrl: "views/modal/joinmodal.html",
        controller: "joinModalCtrl",
        inputs: {
          title: "Enter a GameId to view the game"
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          $state.go('view.game', {'gameid':result.gameid});
        });
      });      
    }

  }]);
