var mysql      = require('mysql'); //import mysql module to script

//provide hostname , username, password and datbasename
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'kqed'
});

//establishing  database connection 
connection.connect();

// export connection
module.exports = connection;