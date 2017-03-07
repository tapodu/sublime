'use strict';
/**
 * @ngdoc overview
 * @name sublimeApp
 * @description
 * # sublimeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('sublimeApp', [
    'ui.router',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pusher-angular',
    'ngDialog',
    'angularModalService'
  ]);
app.controller('ApplicationController', [
  '$rootScope',
  '$state',
  'SocketService',
  function($rootScope, $state, SocketService) {
  }
]);
app.run([
  '$rootScope',
  '$state',
  'SocketService',
  '$anchorScroll',
  function($rootScope, $state, SocketService,$anchorScroll) {

    $rootScope.$on('$stateChangeStart', function() {
      $anchorScroll('top');
    });
    
    
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
      //$window.ga('send', 'pageview', $location.path());
    });
  }
]);
app.config([
  '$stateProvider',
  '$locationProvider',
  '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).state('create', {
      url: '/create/:gameid',
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'    
    }).state('create.game', {
      url: '/game',
      templateUrl: 'views/game.html',
      controller: 'GameCtrl'    
    }).state('view', {
      url: '/view/:gameid',
      templateUrl: 'views/view.html',
      controller: 'ViewCtrl'
    }).state('view.game', {
      url: '/game',
      templateUrl: 'views/game.html',
      controller: 'GameCtrl'    
    }).state('join', {
      url: '/join/:gameid',
      templateUrl: 'views/join.html',
      controller: 'JoinCtrl'  
    }).state('join.game', {
      url: '/game',
      templateUrl: 'views/game.html',
      controller: 'GameCtrl'    
    });
  }
]);
