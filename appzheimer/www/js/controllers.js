//----------------------------------------------------------------------------------
//RUTINA
//----------------------------------------------------------------------------------
angular.module('starter.controllers', [])
  .controller('RutinaCtrl', function($ionicHistory,$scope, $location, Rutina, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.rutina = Rutina.all();
    $scope.remove = function (e) {
      Rutina.remove(e);
    };

  })
  .controller('RutinaRegistroCtrl',function( $filter, $ionicModal, $scope,$location,Rutina){
    $scope.mostrar = false;
    $scope.save=function (evento) {
      evento.hora = $filter('date')(evento.hora, 'shortTime');
      Rutina.add(evento);
      $scope.mostrar = true;
    };
    $scope.cancel=function () {
      $location.path('/tab/familiares/registro');
    };
    $scope.init=function () {
      $scope.mostrar = false;
    };
  })
  .controller('RutinaEditarCtrl',function( $stateParams, $filter,$scope,$location,Rutina, Familiares){
    $scope.mostrar = false;
    $scope.evento = Rutina.get($stateParams.eventoId);
    $scope.save=function (evento) {
      evento.hora = $filter('date')(evento.hora, 'shortTime');
      Rutina.update(evento);
    };
    $scope.cancel=function () {
      $location.path('/tab/rutina');
    }

  })

  //----------------------------------------------------------------------------------
  //PERFIL
  //----------------------------------------------------------------------------------

  .controller('PerfilCtrl', function($location, $scope, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.perfil = Usuario.get();
  })
  .controller('PerfilRegistroCtrl', function($filter, $location, $scope, Usuario) {
    $scope.save=function(usuario){
      usuario.fecha = $filter('date')(usuario.fecha, 'd-MMMM-yyyy');
      Usuario.create(usuario);
      $location.path('/tab/rutina/registro');
    };
  })

  //----------------------------------------------------------------------------------
  //JUEGO
  //----------------------------------------------------------------------------------

  .controller('JuegoCtrl', function($location, $scope, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
  })

  //----------------------------------------------------------------------------------
  //FAMILIARES
  //----------------------------------------------------------------------------------
  .controller('FamiliaresCtrl', function($location, $scope, Familiares, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.familiares = Familiares.all();
    $scope.remove=function(familiar){Familiares.remove(familiar)};
  })
  .controller('FamiliaresRegistroCtrl', function($location, $scope, Familiares) {
    $scope.mostrar = false;
    $scope.save=function(familiar){
      $scope.mostrar = true;
      Familiares.add(familiar);
    };
    $scope.cancel=function() {
      $location.path('/tab/familiares');
    };
    $scope.init=function () {
      $scope.mostrar = false;
    };
  })

  .controller('FamiliaresEditarCtrl', function($stateParams, $location, $scope, Familiares) {
    $scope.familiar = Familiares.get($stateParams.familiarId);
    $scope.save=function(familiar){
      Familiares.update(familiar);
    };
    $scope.cancel=function() {
      $location.path('/tab/familiares');
    };

  })

  //----------------------------------------------------------------------------------
  //CONFIG
  //----------------------------------------------------------------------------------
  .controller('ConfiguracionCtrl', function($location, $scope, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
  })

  //----------------------------------------------------------------------------------
  //TRASH
  //----------------------------------------------------------------------------------
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
