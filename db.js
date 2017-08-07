var mysql = require('mysql');
var connection = null;

var connMysql = function(){
    if(!connection){
        connection = mysql.createConnection({
        host	 : 'duduhouse.dyndns.info',
		user	 : 'billing',
		password : '190790edu',
		database : 'billing'
        });
    }
    return connection;
}

module.exports = function(){
    return connMysql;
}
