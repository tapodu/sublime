'use strict';

/**
 * @ngdoc function
 * @name sublimeApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the sublimeApp
 */
angular.module('sublimeApp')
  .controller('GameCtrl', [
    '$stateParams',
    '$scope',
    'SocketService',
    '$rootScope',
    function ($stateParams, $scope, SocketService, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.ready = false;
    $scope.morpion = [
      { val: '-', 'pos':0 }, { val: '-', 'pos':1 }, { val: '-', 'pos':2 }, 
      { val: '-', 'pos':3 }, { val: '-', 'pos':4 }, { val: '-', 'pos':5 },
      { val: '-', 'pos':6 }, { val: '-', 'pos':7 }, { val: '-', 'pos':8 }
    ];
    $scope.player = $scope.$parent.player;
    $scope.currentPlayer = '-';

    SocketService.subscribe($stateParams.gameid);
    
    if ($scope.$parent.player === 'O'){
      
    } else if ($scope.$parent.player === 'X'){
      $scope.currentPlayer = $scope.$parent.startPlayer;
    } else if ($scope.$parent.player === 'V'){

    }
    
    $scope.cellClick = function(cell) {
      cell.val = $scope.$parent.player;
      SocketService.send({'type':'cellClick', 'data':{'pos':cell.pos, 'player':cell.val}});
      $scope.player ==='X'? $scope.currentPlayer = 'O' : $scope.currentPlayer = 'X';
    };
      
    $rootScope.$on('subscription_succeeded', function(e,data){
      if ($scope.$parent.player === 'V'){
        SocketService.send({'type':'viewerAdded', 'data':{'none':'none'}});
      } else if ($scope.$parent.player === 'O'){
        SocketService.send({'type':'userAdded', 'data':{'none':'none'}});
      }
    });
    
    $rootScope.$on('cellClick', function(e,data){
      $scope.morpion[data.pos].val = data.player;
      data.player === 'X'? $scope.currentPlayer = 'O' : $scope.currentPlayer = 'X';
      $scope.$apply();
    });
  
    $rootScope.$on('userAdded', function(e,data){
      if ($scope.$parent.player === 'X'){
        SocketService.send({'type':'userUpdate', 'data': {'array': $scope.morpion, 'startPlayer': $scope.$parent.startPlayer}});
        $scope.ready = true;
        $scope.$apply();
      }
    });

    $rootScope.$on('userUpdate', function(e,data){
      $scope.$parent.startPlayer = data.startPlayer;
      $scope.currentPlayer = data.startPlayer;
      angular.forEach(data.array, function(value, key) {
        $scope.morpion[value.pos].val = value.val;
      });
      $scope.ready = true;
      $scope.$apply();
    });
    
      $rootScope.$on('viewerAdded', function(e,data){
      if ($scope.$parent.player === 'X'){
        SocketService.send({'type':'viewerUpdate', 'data': {'array': $scope.morpion}});
      }
    });

    $rootScope.$on('viewerUpdate', function(e,data){
      angular.forEach(data.array, function(value, key) {
        $scope.morpion[value.pos].val = value.val;
      });
      $scope.ready = true;
      $scope.$apply();
    });
 
  
  }]);
