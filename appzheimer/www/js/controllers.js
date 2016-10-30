//----------------------------------------------------------------------------------
//RUTINA
//----------------------------------------------------------------------------------
angular.module('starter.controllers', [])
  .controller('RutinaCtrl', function($scope, $location, Rutina, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.rutina = Rutina.all();
    $scope.remove = function (e) {
      Rutina.remove(e);
    };

  })
  .controller('RutinaRegistroCtrl',function($ionicModal, $scope,$location,Rutina){
    $scope.showModal = function () {
      $ionicModal.fromTemplateUrl('/templates/rutina-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) { $scope.modal = modal; });
    };
    $scope.save=function (evento) {
      Rutina.add(evento);
      $scope.showModal();
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
  .controller('PerfilRegistroCtrl', function($location, $scope, Usuario) {
    $scope.save=function(usuario){
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
    $scope.save=function(familiar){
      Familiares.add(familiar);
    };
    $scope.cancel=function() {
      $location.path('/tab/rutina');
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
