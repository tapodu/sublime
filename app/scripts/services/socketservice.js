'use strict';

/**
 * @ngdoc service
 * @name sublimeApp.websocket
 * @description
 * # websocket
 * Service in the sublimeApp.
 */
angular.module('sublimeApp')
  .service('SocketService', [
    '$pusher',
    '$rootScope', 
    function ($pusher, $rootScope) {
    var service = {};
    var pusher = null;
    var room = null;
    var active = false;
    
    service.connect = function(){
      Pusher.logToConsole = true;

      pusher = new Pusher('476b03a0cc33193666c0'
        , {
          authTransport: 'jsonp',
          authEndpoint: 'https://ident.dacast.com/backend/pushertest',
          auth: {
            params: {
              user_id: Math.floor((Math.random()*1000000000000)+1)
            }
          }
        }
      );
    
      active = true;
    };


    var authenticate = function(id){
      
    }
    
    service.subscribe = function(id){
      var roomName = 'private-'+id;
      room = pusher.subscribe(roomName);
      room.bind('client-message',
        function (e) {
          $rootScope.$broadcast(e.type, e.data);
        }
      );
      
      room.bind('pusher:subscription_succeeded', function() {
        $rootScope.$broadcast('subscription_succeeded'); 
      });
    };
    
    service.send = function(data){
      room.trigger('client-message', data);
    }
    
    service.disconnect = function(){
      pusher.disconnect();
      client = null;
      active= false;
    };
      
      
    service.isActive = function(){
      return active;
    };
    
    return service;
  }]);
