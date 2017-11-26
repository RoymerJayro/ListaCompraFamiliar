'use strict';

module.exports = function(ListaFamiliar) {
    
    
    
    
    ListaFamiliar.beforeRemote('create', function( context, listafamiliar, next) {
        //var UserId=context.req.accessToken.userId;
        delete context.req.accessToken.userId;
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
    ListaFamiliar.afterRemote('create', function( context, listafamiliar, next) {
        // Buscar el id de la lista
        var idDeLaLista = listafamiliar.id;
        // Buscar al usuario con el id del accesstoken
        var usuarioId = context.req.accessToken.userId;
        var Usuario=ListaFamiliar.app.models.Usuario;
        Usuario.findById(usuarioId, function(err, usuario){
       //asocia al usuario esa lista
             usuario.listaFamiliarId = idDeLaLista;
        //guardar el usuario
             usuario.save(function(err){
                 next();
             });
        });
    });
    
/**
 * Enlasaremos el usuario con su solicitud
 * @param {object} context Contiene el context
 * @param {Function(Error, object)} callback
 */

ListaFamiliar.prototype.solicitar = function(context, callback) {
  var solicitud;
  var userId=context.req.accessToken.userId;
  var listafamiliar=this;
  listafamiliar.solicitudes.add(userId, function(err) {
            if(err)callback(err);
            solicitud={
                listafamiliarId:listafamiliar.id,
                usuarioId:userId
            }
            callback(null, solicitud);
   });
  
};




};

