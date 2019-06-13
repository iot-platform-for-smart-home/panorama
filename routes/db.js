var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    port:3306,
    password:'123456',
    database:'expressjs'
});
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,function(err,rows){
            callback(err,rows);
            connection.release();
        });
    });
}
exports.query = query;