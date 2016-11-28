angular.module('starter.services', [])
  .factory('Servicios',function($http, Familiares, Rutina, Usuario){
    return{
      getFamiliares:function(){
        $http.get(URL).then(function(resp){
          console.log('Success', resp); // JSON object
          Familiares.setAll(JSON.parse(resp));
        }, function(err){
          console.error('ERR', err);
          alert('Error'+ err);
        });
      },
      getPerfil:function () {
        $http.get(URL).then(function(resp){
          console.log('Success', resp); // JSON object
          Usuario.setAll(JSON.parse(resp));
        }, function(err){
          console.error('ERR', err);
          alert('Error'+ err);
        });
      },
      getRutina:function(){
        $http.get(URL).then(function(resp){
          console.log('Success', resp); // JSON object
          Rutina.setAll(JSON.parse(resp));
        }, function(err){
          console.error('ERR', err);
          alert('Error'+ err);
        });
      },
      getUbicacion:function () {

      },
      getAll:function(){
        getRutina();
        getFamiliares();
        getPerfil();
      }
    };
  })
  .factory('Familiares',function (Usuario) {
    var FAMILIARES_KEY="FAMILIARES";
    var FAMILIARES_INDEX = "FAMILIARES_INDEX";
    var familiares;
    var path;
    var index =(window.localStorage.getItem(FAMILIARES_INDEX))?JSON.parse(window.localStorage.getItem(FAMILIARES_INDEX)):0;
    return{
      setAll:function(fams){
        familiares = fams;
      },
      all:function(){
        familiares =(window.localStorage.getItem(FAMILIARES_KEY))?JSON.parse(window.localStorage.getItem(FAMILIARES_KEY)):[];
        return familiares;
      },
      remove:function(f){
        familiares = window.localStorage.getItem(FAMILIARES_KEY);
        if(familiares) {
          familiares = JSON.parse(familiares);
          for(var i =0; i<familiares.length; i++){
            if(familiares[i].id==parseInt(f.id)){
              familiares.splice(i,1);
              window.localStorage.setItem(FAMILIARES_KEY, JSON.stringify(familiares));
              break;
            }

          }
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
        f.rutaImagen = path;
        familiares.push(f);
        window.localStorage.setItem(FAMILIARES_KEY, JSON.stringify(familiares));
        index++;
        window.localStorage.setItem(FAMILIARES_INDEX,JSON.stringify(index));
      },setPath : function (p) {
        path = p;
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
  .factory('Rutina',function (Usuario) {
    var RUTINA_KEY ="RUTINA";
    var RUTINA_INDEX="RUTINA_INDEX";
    var index=(window.localStorage.getItem(RUTINA_INDEX))?JSON.parse(window.localStorage.getItem(RUTINA_INDEX)):0;
    var rutina;
    return{
      setAll:function (rut) {
        rutina = rut;
      },
      all:function(){
        rutina = (window.localStorage.getItem(RUTINA_KEY))?JSON.parse(window.localStorage.getItem(RUTINA_KEY)):[];
        return rutina;
      },
      remove:function(e){
        rutina = window.localStorage.getItem(RUTINA_KEY);
        if(rutina) {
          rutina = JSON.parse(rutina);
          for(var i =0;i<rutina.length;i++){
            if(rutina[i].id==parseInt(e.id)){
              rutina.splice(i,1);
              window.localStorage.setItem(RUTINA_KEY, JSON.stringify(rutina));
              break;
            }
          }
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
    var estado = 'PACIENTE';
    var usuario;
    var USUARIO_KEY="USUARIO";
    var path;
    return{
      setAll:function (p) {
        usuario = p;
        estado = 'FAMILIAR';
      },
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
        usuario.rutaImagen = path;
        window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
      },setPath : function (p) {
        path = p;
      },
      update:function (u) {
        usuario = u;
        window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
      }
    };
  })

  .factory('ImageService', function($cordovaCamera, $q, $cordovaFile, Usuario, Familiares) {
    var imageName;
    function makeid() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    function optionsForType(type) {
      var source;
      switch (type) {
        case 0:
          source = Camera.PictureSourceType.CAMERA;
          break;
        case 1:
          source = Camera.PictureSourceType.PHOTOLIBRARY;
          break;
      }
      return {
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation:true,
        sourceType: source,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
    };

    function returnName() {
      return imageName;
    };

    function saveMedia(type,service) {
      return $q(function(resolve, reject) {
        var options = optionsForType(type);
        console.log("Escoge una opción");
        $cordovaCamera.getPicture(options).then(function(imageUrl) {
          console.log("Obtuvo url");
          var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          var newName = makeid() + name;
          $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
            .then(function(info) {
              console.log("Success");
              imageName = newName;
              console.log(newName);
              if(service == 0)
                Usuario.setPath(cordova.file.dataDirectory + newName);
              else
                Familiares.setPath( cordova.file.dataDirectory + newName);
              //FileService.storeImage(newName);
              resolve();
            }, function(e) {
              reject();
            });
        });
      })
    };
    return {
      handleMediaDialog: saveMedia,
      returnName : returnName
    };
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
