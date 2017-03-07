'use strict';

/**
 * @ngdoc function
 * @name sublimeApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the sublimeApp
 */
angular.module('sublimeApp')
  .controller('CreateCtrl',
    [
      'SocketService',
      '$state',
      'ngDialog',
      '$scope',
      '$stateParams',
    function (SocketService, $state, ngDialog, $scope, $stateParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.gameid = Math.floor((Math.random()*1000000)+1);
    $scope.player = 'X';
    $scope.startPlayer = 'X';
    if (Math.random() > 0.5){
      $scope.startPlayer = 'O';
    }
    
    if ($stateParams.gameid){
      $scope.gameid = $stateParams.gameid;
      $state.go('create.game');
    } else {  
      $state.go('create',{'gameid':$scope.gameid});
    }
    
    SocketService.connect();
    


  }]);
