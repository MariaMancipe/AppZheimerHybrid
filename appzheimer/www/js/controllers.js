//----------------------------------------------------------------------------------
//RUTINA
//----------------------------------------------------------------------------------
angular.module('starter.controllers', [])
  .controller('RutinaCtrl', function($ionicHistory,$scope, $location, Rutina, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.rutina = Rutina.all();
    $scope.mostrar=false;
    $scope.ordenar = false;
    $scope.remove = function (e) {Rutina.remove(e);};
    $scope.edit=function () {$scope.mostrar = !$scope.mostrar;};
    $scope.order =function () {$scope.ordenar=!$scope.ordenar;};
    $scope.move = function () {

    };
  })
  .controller('RutinaRegistroCtrl',function($filter, $ionicModal, $scope,$location,Rutina, Usuario, $cordovaSocialSharing){
    $scope.mostrar = false;
    $scope.save=function (evento) {
      evento.hora = $filter('date')(evento.hora, 'shortTime');
      Rutina.add(evento);
      $scope.mostrar = true;
      $scope.share("Un día genial");
    };
    $scope.cancel=function () {
      $location.path('/tab/familiares/registro');
    };
    $scope.init=function () {
      $scope.mostrar = false;

    };
    $scope.share=function(message){
      $cordovaSocialSharing.shareViaWhatsApp(message, null, null).then(function(result) {
          alert("Informacion: La actividad se compartio existosamente");
        }, function(err) {
          alert("Error: No se ha podido compartir la actividad por whatsapp");
        });
    };
  })
  .controller('RutinaEditarCtrl',function( $stateParams, $filter,$scope,$location,Rutina, Familiares){
    $scope.mostrar = false;
    $scope.evento = Rutina.get($stateParams.eventoId);
    $scope.convertTime=function(string){
      var espacio = string.split(" ");
      var hora = espacio[0].split(":");
      if(espacio[1]=="PM")
        hora[0] = parseInt(hora[0])+12;
      $scope.evento.hora=new Date(1970,0,1, hora[0], hora[1], 0);
    };
    $scope.convertTime($scope.evento.hora);
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
    $scope.mostrar = false;
    $scope.familiares = Familiares.all();
    $scope.remove=function(familiar){
      console.log("paso por aquí");
      Familiares.remove(familiar);
    };
    $scope.edit=function () {
      $scope.mostrar = !$scope.mostrar;
    };

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
