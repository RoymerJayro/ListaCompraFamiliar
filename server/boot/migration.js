/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var config = require('../config.local.js')

module.exports = function(app) {
    //data sources
    var mysqlDs = app.dataSources.mysqlDs;
    
    if(process.env.AUTOMIGRATE) {
        mysqlDs.automigrate(null, function (err) {
            if (err) console.log(err);
            console.log('> Models migrated to tables');
            
            
            
        });
    }
}