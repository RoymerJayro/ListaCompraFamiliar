'use strict';

module.exports = function(Listafamiliar) {
    
    
    
    
    Listafamiliar.beforeRemote('create', function( context, listafamiliar, next) {
        //var UserId=context.req.accessToken.userId;
        delete context.req.accessToken.userId;
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });

};
