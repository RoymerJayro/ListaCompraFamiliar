module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('MiembroLista', function(role, context, cb) {
    // Q: Is the current request accessing a Project?
    if (context.modelName !== 'MiembroLista') {
      // A: No. This role is only for projects: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Project?
    // Step 1: lookup the requested project
    context.model.findById(context.modelId, function(err, producto) {
        
      if(err) return cb(err);
      
      if(!producto) return cb(new Error("MiembroLista not found"));
      
      var Producto = app.models.Producto;
      var Usuario = app.models.Usuario;
      Usuario.findById(userId,function(err,ObjUsuarioAutentificado){
          if(err)cb(err);
          if(ObjUsuarioAutentificado.listaFamiliarId==Producto.listaFamiliarId)return cb(null, true);
      });
      
      
    });
  });
};