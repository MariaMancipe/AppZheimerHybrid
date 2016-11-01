//----------------------------------------------------------------------------------
//RUTINA
//----------------------------------------------------------------------------------
angular.module('starter.controllers', [])
  .controller('RutinaCtrl', function($ionicHistory,$scope, $location, Rutina, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }

    $scope.$on('$ionicView.enter', function(){
      $scope.rutina = Rutina.all();
      if(!$scope.rutina)
        alert("Por favor agregue ACTIVIDADES a la RUTINA");
    });
    $scope.$on('$ionicView.loaded', function(){
      $scope.rutina = Rutina.all();
    });
    $scope.rutina = Rutina.all();
    $scope.mostrar=false;
    $scope.ordenar = false;
    $scope.remove = function (e) {
      Rutina.remove(e);
      $scope.rutina = Rutina.all();
    };
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
      $location.path('/tab/rutina');
      $scope.share(Usuario.get().nombre +" quiere compartir la actividad " + evento.nombre+ " contigo, a la hora " + evento.hora);
    };
    $scope.cancel=function () {
      $location.path('/tab/rutina');
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
      $location.path('/tab/rutina');
    };
    $scope.cancel=function () {
      $location.path('/tab/rutina');
    }


  })

  //----------------------------------------------------------------------------------
  //PERFIL
  //----------------------------------------------------------------------------------

  .controller('PerfilCtrl', function($location, $scope, Usuario, $cordovaFile) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.$on('$ionicView.enter', function(){
      $scope.perfil = Usuario.get();
    });


  })
  .controller('PerfilRegistroCtrl', function($filter, $location, $scope, Usuario, ImageService, $ionicActionSheet) {
    $scope.save=function(usuario){
      usuario.fecha = $filter('date')(usuario.fecha, 'd-MMMM-yyyy');
      Usuario.create(usuario);
      $location.path('/tab/perfil');
    };

    $scope.addMedia = function() {
      ImageService.handleMediaDialog(0, 0).then(function() {
        $scope.$apply();
      });
    };

  })

  //----------------------------------------------------------------------------------
  //JUEGO
  //----------------------------------------------------------------------------------

  .controller('JuegoCtrl', function($location, $scope, Usuario, Familiares) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.familiares=Familiares.all();
    $scope.random=[];
    $scope.respuesta=0;
    $scope.set = function(){
      $scope.random=[];
      $scope.respuesta =0;
      if($scope.familiares.length>=4){
        for(var i =0; i<4;i++){
          $scope.random[i]= $scope.familiares[Math.floor(Math.random()*$scope.familiares.length)];
        }
        $scope.respuesta = Math.floor(Math.random()*4);
      }else{
        alert("Por favor agregue más familiares para iniciar el juego");
      }
    };
    $scope.check=function (index) {
      if($scope.respuesta == index)
        $scope.set();
      else
        alert("Inténtelo de nuevo. No se preocupe");
    };
    $scope.set();
  })

  //----------------------------------------------------------------------------------
  //FAMILIARES
  //----------------------------------------------------------------------------------
  .controller('FamiliaresCtrl', function($location, $scope, Familiares, Usuario) {
    if(!Usuario.get()){
      $location.path('/tab/perfil/registro');
    }
    $scope.$on('$ionicView.enter', function(){
      $scope.familiares = Familiares.all();
      if(!$scope.familiares)
        alert("Por favor agregue a sus FAMILIARES a la lista");
    });
    $scope.mostrar = false;
    $scope.remove=function(familiar){
      Familiares.remove(familiar);
      $scope.familiares = Familiares.all();
    };
    $scope.edit=function () {
      $scope.mostrar = !$scope.mostrar;
    };

  })
  .controller('FamiliaresRegistroCtrl', function($location, $scope, Familiares, ImageService) {
    $scope.mostrar = false;
    $scope.save=function(familiar){
      $location.path('/tab/familiares');
      Familiares.add(familiar);
    };
    $scope.cancel=function() {
      $location.path('/tab/familiares');
    };
    $scope.init=function () {
      $scope.mostrar = false;
    };

    $scope.addMedia = function() {
      ImageService.handleMediaDialog(0, 1).then(function() {
        $scope.$apply();
      });
    };
  })

  .controller('FamiliaresEditarCtrl', function($stateParams, $location, $scope, Familiares) {
    $scope.familiar = Familiares.get($stateParams.familiarId);
    $scope.save=function(familiar){
      Familiares.update(familiar);
      $location.path('/tab/familiares');
    };
    $scope.cancel=function() {
      $location.path('/tab/familiares');
    };

    $scope.addMedia = function() {
      ImageService.handleMediaDialog(0, 1).then(function() {
        $scope.$apply();
      });
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
