'use strict';

module.exports = function(Producto) {
    /**
    * Ponder a falso todos los productos del usuario autentificado
    * @param {object} context Objeto de la solicitud
    * @param {Function(Error, object)} callback
    */

   Producto.limpiarLista = function(context, callback) {
     //var listaProductos;
     var usuario=Producto.app.models.Usuario;
     var usuarioAutentificado=context.req.accessToken.userId;
     
     usuario.findById(usuarioAutentificado,function(err,ObjUsuarioAutentificado){
         console.log(ObjUsuarioAutentificado);
         Producto.updateAll({listaFamiliarId:ObjUsuarioAutentificado.listaFamiliarId},{comprar:0}, function(err){
            if(err)callback(err);
                Producto.find({where:{listaFamiliarId:ObjUsuarioAutentificado.listaFamiliarId}}, function(err,listaProductos){
                    if(err)callback(err);
                    console.log(listaProductos);
                    callback(null, listaProductos);
            });
         });
     });
     
   };
   
   /**
 * Vamos a cambiar el estado de un producto
 * @param {object} context Datos del usuario autentifiacdo
 * @param {Function(Error, array)} callback
 */

    Producto.prototype.productoComprado = function(context, callback) {
      var ProductoCambiar=this;
      if(ProductoCambiar.comprar==true){
              ProductoCambiar.comprar=false;
      }else{
          ProductoCambiar.comprar=true;
      }
      ProductoCambiar.save(function(err){
          if(err)callback(err);
          Producto.find({where:{listaFamiliarId:ProductoCambiar.listaFamiliarId}}, function(err, listaCompras){
              if(err) callback(err);
              callback(null, listaCompras);
          });
      });
    };

};
