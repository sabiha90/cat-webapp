CREATE database cat_db;

CREATE TABLE IF NOT EXISTS cat_details 
( Id int NOT NULL AUTO_INCREMENT, 
  name varchar(255) NOT NULL, 
  username varchar(255) NOT NULL, 
  password varchar(255) NOT NULL, 
  lastSeenAt date NOT NULL, 
  breed varchar(255), birthdate date, 
  imgUrl varchar(255), 
  weight float NOT NULL, 
  addedAt Date NOT NULL, 
  PRIMARY KEY (Id),
  UNIQUE(username));