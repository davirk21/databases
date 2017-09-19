DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  userName CHAR(25) 
  
);

CREATE TABLE room (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  roomName CHAR(25) 
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  message CHAR(200) , 
  user INT,
  room INT,
  
  FOREIGN KEY (user) REFERENCES user(id),
  FOREIGN KEY (room) REFERENCES room(id)
  /* Describe your table here.*/
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

