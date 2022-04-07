var mysql = require('mysql');
var db_info = {
    host: "us-cdbr-east-04.cleardb.com",
    user: "bbafcd54627a2d",
    port: 3306,
    password: "7238d0a2",
    database: "heroku_09af8084c6587b2",
    connectionLimit : 5
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}