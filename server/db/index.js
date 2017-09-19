var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'plantlife',
  database : 'chat'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


