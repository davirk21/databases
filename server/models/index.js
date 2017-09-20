var db = require('../db').connection;

module.exports = {
  messages: {
    get: function (callback) {
      var query = 'select user.userName as username, room.roomName as roomname, messages.message as text, messages.id as objectId \
                  from messages inner join user inner join room\
                  on messages.user = user.id \
                  and messages.room = room.id;';
      db.query(query, function (error, results, fields) {
        if (error) {
          console.error('error');
          return;
        }
        callback(results);
      });
    }, // a function which produces all the messages
    
    post: function ({username, roomname, message}) { //es6 destructure from messages
      //console.log(username, roomname, message);
      var userQuery = 'select user.id \
                       from user \
                       where userName = ?';
                      
      var roomQuery = 'select room.id\
                       from room\
                       where roomName = ?';  
                       
                       
       var roomid, userid;     
       function sendmessage () {
        if (userid && roomid) {
          var completeQuery = 'insert into messages (user, room, message) values (?,?,?)';
          db.query(completeQuery, [userid, roomid, message], function (error, results, fields) {
            if (error) {
              console.error('error');
              return;
            }
            if(results.insertId) console.log('time to go home');
          });
        }
      } 
              
      db.query(userQuery, [username], function (error, results, fields) {
        if (error) {
          console.error('error');
          return;
        }
        
        if (results.length === 0) { 
          var newQuery = 'insert into user (username) values (?)';
          db.query(newQuery, [username], function (error, results, fields) { //
            if (error) {
              console.error('error');
              return;
            }
            userid = results.insertId;
            
            sendmessage();
          });
        } else {
          userid = results[0].id; //set the userid 
          sendmessage();
        }
        
      });
      
      db.query(roomQuery, [roomname], function (error, results, fields) { //query to room to check roomName
        if (error) {
          console.error('error');
          return;
        }
        
        if (results.length === 0) { // if there is no room 
          var newQuery = 'insert into room (roomname) values (?)';  // insert new roomname to room
          db.query(newQuery, [roomname], function (error, results, fields) { //
            if (error) {
              console.error('error');
              return;
            }
            roomid = results.insertId; // get the id of that roon name
            
            sendmessage();  //invoke message to check if all three are there (message, roomid, user.id)
          });
        } else {                       //if there is already a room
          console.log(results[0].id); 
          roomid = results[0].id;     //assign the id from the results [{id: ?}]
          sendmessage();
        }
        
         
      });

    } // a function which can be used to insert a message into the database
  },
  
  
  
  users: {
    // Ditto as above.
    get: function (callback) {
      db.query ('SELECT * FROM `user`', function (error, results, fields) {
        if (error) {
          console.error('error');
          return;
        }
        callback(results);
  // error will be an Error if one occurred during the query 
  // results will contain the results of the query 
  // fields will contain information about the returned results fields (if any) 
      });
    },
    
    post: function (username) {
      db.query('insert into `user` (userName) values (?)', [username], function (error, results, fields) {
        if (error) {
          console.error('error');
          return;
        }

      });
    }
  }
};

