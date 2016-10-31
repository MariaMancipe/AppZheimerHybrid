angular.module('starter.services', [])
  .factory('Familiares',function () {
    var FAMILIARES_KEY="FAMILIARES";
    var FAMILIARES_INDEX = "FAMILIARES_INDEX";
    var familiares;
    var index =(window.localStorage.getItem(FAMILIARES_INDEX))?JSON.parse(window.localStorage.getItem(FAMILIARES_INDEX)):0;
    return{
      all:function(){
        familiares =(window.localStorage.getItem(FAMILIARES_KEY))?JSON.parse(window.localStorage.getItem(FAMILIARES_KEY)):[];
        return familiares;
      },
      remove:function(f){
        familiares = window.localStorage.getItem(FAMILIARES_KEY);
        if(familiares){
          familiares = JSON.parse(familiares);
          familiares.pop(e);
          window.localStorage.setItem(FAMILIARES_KEY, JSON.stringify(familiares));
        }
      },
      get:function(familiarId){
        familiares = window.localStorage.getItem(FAMILIARES_KEY);
        if(familiares) {
          familiares = JSON.parse(familiares);
          for(var i =0; i<familiares.length; i++){
            if(familiares[i].id==parseInt(familiarId))
              return familiares[i];
          }
        }
      },
      add:function(f){
        familiares = window.localStorage.getItem(FAMILIARES_KEY);
        if(familiares)
          familiares = JSON.parse(familiares);
        else
          familiares=[];
        f.id= index;
        familiares.push(f);
        window.localStorage.setItem(FAMILIARES_KEY, JSON.stringify(familiares));
        index++;
        window.localStorage.setItem(FAMILIARES_INDEX,JSON.stringify(index));
      },
      update:function (f) {
        familiares = window.localStorage.getItem(FAMILIARES_KEY);
        if(familiares) {
          familiares = JSON.parse(familiares);
          for(var i =0; i<familiares.length; i++){
            if(familiares[i].id==parseInt(f.id)){
              familiares[i]=f;
              window.localStorage.setItem(FAMILIARES_KEY, JSON.stringify(familiares));
              break;
            }

          }
        }
      }
    };

  })
  .factory('Rutina',function () {
    var RUTINA_KEY ="RUTINA";
    var RUTINA_INDEX="RUTINA_INDEX";
    var index=(window.localStorage.getItem(RUTINA_INDEX))?JSON.parse(window.localStorage.getItem(RUTINA_INDEX)):0;
    var rutina;
    return{
      all:function(){
        rutina = (window.localStorage.getItem(RUTINA_KEY))?JSON.parse(window.localStorage.getItem(RUTINA_KEY)):[];
        return rutina;
      },
      remove:function(e){
        rutina = window.localStorage.getItem(RUTINA_KEY);
        if(rutina){
          rutina = JSON.parse(rutina);
          rutina.pop(e);
          window.localStorage.setItem(RUTINA_KEY, JSON.stringify(rutina));
        }
      },
      get:function(eventoId){
        rutina = window.localStorage.getItem(RUTINA_KEY);
        if(rutina) {
          rutina = JSON.parse(rutina);
          for(var i =0;i<rutina.length;i++){
            if(rutina[i].id==parseInt(eventoId))
              return rutina[i];
          }
        }
      },
      add:function(e){
        rutina = window.localStorage.getItem(RUTINA_KEY);
        if(rutina)
          rutina = JSON.parse(rutina);
        else
          rutina=[];
        e.id=index;
        rutina.push(e);
        index++;
        window.localStorage.setItem(RUTINA_KEY, JSON.stringify(rutina));
        window.localStorage.setItem(RUTINA_INDEX,JSON.stringify(index));
      },
      update:function (e) {
        rutina = window.localStorage.getItem(RUTINA_KEY);
        if(rutina) {
          rutina = JSON.parse(rutina);
          for(var i =0;i<rutina.length;i++){
            if(rutina[i].id==parseInt(e.id)){
              rutina[i]=e;
              window.localStorage.setItem(RUTINA_KEY, JSON.stringify(rutina));
              break;
            }
          }
        }
      }
    };
  })
  .factory('Usuario',function () {
    var usuario;
    var USUARIO_KEY="USUARIO";
    return{
      remove:function(){
        usuario ={};
        window.localStorage.removeItem(USUARIO_KEY);

      },
      get:function(){
        usuario = (window.localStorage.getItem(USUARIO_KEY))?JSON.parse(window.localStorage.getItem(USUARIO_KEY)):null;
        return usuario;
      },
      create:function(u){
        usuario = u;
        window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
      },
      update:function (u) {
        usuario = u;
        window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
      }
    };
  })
  .factory('Configuracion',function () {

  })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
