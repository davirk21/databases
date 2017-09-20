var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'plantlife',
  database : 'chat'
});
 
connection.connect(function(err) {
  if(err) {
     console.error("err");
     return;
  }
   console.log("connected");
});
 
exports.connection = connection;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


