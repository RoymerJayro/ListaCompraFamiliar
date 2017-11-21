'use strict';

module.exports = function(Listafamiliar) {
    
    
    
    
    Listafamiliar.beforeRemote('create', function( context, listafamiliar, next) {
        //var UserId=context.req.accessToken.userId;
        delete context.req.accessToken.userId;
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
    Listafamiliar.afterRemote('create', function( context, listafamiliar, next) {
        // Buscar el id de la lista
        var idDeLaLista = listafamiliar.id
        // Buscar al usuario con el id del accesstoken
        var usuarioId = context.req.accessToken.userId;
        var Usuario=Listafamiliar.app.models.Usuario;
        Usuario.findById(usuarioId, function(err, usuario){
       //asocia al usuario esa lista
             usuario.listaFamiliarId = idDeLaLista;
        //guardar el usuario
             usuario.save(function(err){
                 next();
             });
        });
        

    });
};
