// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.rutina', {
    url: '/rutina',
    views: {
      'tab-rutina': {
        templateUrl: 'templates/tab-rutina.html',
        controller: 'RutinaCtrl'
      }
    }
  })
    .state('tab.rutina-registro', {
      url: '/rutina/registro',
      views: {
        'tab-rutina': {
          templateUrl: 'templates/evento-registro.html',
          controller: 'RutinaRegistroCtrl'
        }
      }
    })
    .state('tab.rutina-editar', {
      url: '/rutina/:eventoId',
      views: {
        'tab-rutina': {
          templateUrl: 'templates/evento-registro.html',
          controller: 'RutinaEditarCtrl'
        }
      }
    })
  .state('tab.perfil', {
      url: '/perfil',
      views: {
        'tab-perfil': {
          templateUrl: 'templates/tab-perfil.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('tab.perfil-registro', {
      url: '/perfil/registro',
      views: {
        'tab-perfil': {
          templateUrl: 'templates/perfil-registro.html',
          controller: 'PerfilRegistroCtrl'
        }
      }
    })
    .state('tab.juego', {
      url: '/juego',
      views: {
        'tab-juego': {
          templateUrl: 'templates/tab-juego.html',
          controller: 'JuegoCtrl'
        }
      }
    })
    .state('tab.familiares', {
      url: '/familiares',
      views: {
        'tab-familiares': {
          templateUrl: 'templates/tab-familiares.html',
          controller: 'FamiliaresCtrl'
        }
      }
    })
    .state('tab.familiares-registro', {
      url: '/familiares/registro',
      views: {
        'tab-familiares': {
          templateUrl: 'templates/familiar-registro.html',
          controller: 'FamiliaresRegistroCtrl'
        }
      }
    })
    .state('tab.familiares-editar', {
      url: '/familiares/:familiarId',
      views: {
        'tab-familiares': {
          templateUrl: 'templates/familiar-registro.html',
          controller: 'FamiliaresEditarCtrl'
        }
      }
    })
    .state('tab.ubicacion', {
      url: '/ubicacion',
      views: {
        'tab-ubicacion': {
          templateUrl: 'templates/tab-ubicacion.html',
          controller: 'UbicacionCtrl'
        }
      }
    })
    .state('tab.posicion', {
      url: '/posicion',
      views: {
        'tab-posicion': {
          templateUrl: 'templates/tab-posicion.html',
          controller: 'PosicionCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/rutina');

});
