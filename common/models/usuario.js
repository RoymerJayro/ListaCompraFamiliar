'use strict';

module.exports = function(Usuario) {
 /**
 * Aceptamos las solicitudes segun la id
 * @param {object} context Contiene el usuario logueado
 * @param {Function(Error, array)} callback
 */

    Usuario.prototype.AceptarSolicitud = function(context, callback) {
       var aceptarSolicitud="Se a aceptado la solicitud";
       //var listaId;
       var UsuariosdelaLista=[];
       var usuarioAutentificado=context.req.accessToken.userId;
      var usuarioSolicitante=this;
       
       Usuario.findById(usuarioAutentificado, function(err, usuarioAceptador){
           
           if(err) callback(err);
           //Buscamos la listaId del usuario autentificado
             Usuario.find({
                 where:{
                     listaFamiliarId:usuarioAceptador.listaFamiliarId
                 }
                 //Una vez encontrado su listaIDFamiliar
             }, function(err,UsuariosdelaLista){
                 if(err) callback(err);
                 usuarioSolicitante.solicitud.findById(usuarioAceptador.listaFamiliarId, function(err, listaFamiliarSolicitante) {
                    if(err)callback(err); console.log(listaFamiliarSolicitante);
                        usuarioSolicitante.listaFamiliarId=listaFamiliarSolicitante.id;
                        usuarioSolicitante.save(function(err, usuarioSolicitante){
                            UsuariosdelaLista.push(usuarioSolicitante);
                            if(err)callback(err);
                            usuarioSolicitante.solicitud.remove(listaFamiliarSolicitante.id,function(err){
                                if(err)callback(err);
                                callback(null,UsuariosdelaLista)
                            });
                        });
                 });
             });
            
        });
    };

/**
 * Rechazaremos las solicitudes 
 * @param {object} context recibimos la solicitud
 * @param {Function(Error, array)} callback
 */

Usuario.prototype.rechazarSolicitudes = function(context, callback) {

    var usuarioAutentificado=context.req.accessToken.userId;
    var usuarioSolicitante=this;
    //console.log(usuarioSolicitante);
    Usuario.findById(usuarioAutentificado,function(err, objUsuarioAceptador){
         if(err)callback(err);
         console.log(usuarioSolicitante);
         Usuario.find({
             where:{listaFamiliarId:objUsuarioAceptador.listaFamiliarId}
         },function(err, UsuarioEnLaLista){
             if(err)callback(err);
             usuarioSolicitante.solicitud.findById(objUsuarioAceptador.listaFamiliarId,function(err,listaFamiliarSolicitante){
                 if(err)callback(err);
                 console.log(listaFamiliarSolicitante);
                 usuarioSolicitante.solicitud.remove(listaFamiliarSolicitante.id,function(err){
                     if(err)callback(err);
                     
                     callback(null,UsuarioEnLaLista);
                 });
             });
         });
     });

};

};
