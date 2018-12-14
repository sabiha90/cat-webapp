var express = require('express');
var passwordHash = require('password-hash');
var validator = require('validator');
var db = require('../db/db_connection');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var Promise = require('promise');
const { check, validationResult } = require('express-validator/check');
//render the home page with the GET request
exports.home_page = function(req, res, next) {
  res.render('index', { title: 'Welcome to Cat World!' });
}

//module to register the cat details
exports.register_cat = function(req, res){
    var today = new Date(); // function to retrieve the date
    //storing the parameters in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    var cat_properties = {
      "name": req.body.name,
      "username": req.body.username,
      "password": passwordHash.generate(req.body.password),
      "lastSeenAt": today,
      "breed": req.body.breed,
      "birthdate": req.body.birthdate,
      "imgUrl": req.body.imgUrl,
      "weight": req.body.weight,
      "addedAt": today
    }
  
  
    console.log(cat_properties.username);
    //check if there is already a user with the same username
    db.query('select username from cat_details where username =?',cat_properties.username,function (error, results, fields) {
    console.log(this.sql);
    if(error)
    {
      res.send({
                "code":500,
                "error": "An error occurred!"
                });
      console.log("first",error);
    }
    else if(results.length>0) //if there is a user, throw an error
    {
      res.send({"code": 400,"error":"user already exists!"});
    }
    else
    {
      //Insert the details into the database
       db.query('INSERT INTO cat_details SET ?',cat_properties, function (error, results) {
        if (error) {
            res.send({
                "code":500,
                "error": "An error occurred!"
                });
          }
        else{
        res.send({
          "code":201,
          "success": "User added successfully"
        });
      }
    });
    }
  });
  
}
//module for logging in a user and return an authToken
exports.login_user = function(req,res)
{ 
  console.log('inside login');

  var user_details = {
    "username" : req.body.username,
    "password" : req.body.password,
    "lastSeenAt" :new Date()
  }
  //If the username doesn't match the criteria
  if(!validator.isEmail(user_details.username))
  {
    res.send({"message":"Invalid user name"});
  }
  //check if there is a user with the entered username
  db.query('SELECT * FROM cat_details WHERE username = ?',user_details.username, function (error, results, fields) {
    console.log(this.sql);
    if(error)
     {
       res.send({
        "code":400,
        "error":"error ocurred"
      });
     }
    else
     {
       if(results.length > 0)
        {//comparing the password with the password retrieved from the database
          if(passwordHash.verify(user_details.password, results[0].password) || user_details.password == results[0].password)
          { 
            console.log("logged in with password");
            db.query('Update cat_details set lastSeenAt = ? where username = ? and password = ?',[user_details.lastSeenAt,user_details.username,passwordHash.generate(user_details.password)], function (error, results, fields) {
            if(error)
              {
                console.log("error ocurred",error);
                res.send({
                "code":500,
                "error":"error ocurred"
                });
              }
            else
            {
              //Generating the authToken using jsonwebtoken
              var token = jwt.sign({ id: results._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
              });
              console.log('Updated with'+user_details.lastSeenAt);
              res.send({
              "authoToken": token,
               "code":201,
               "success":"updated sucessfully"
                  }); 
            }
          });
          }
          //If the password doesn't match
          else
          {
              res.send({
                "code":401,
                "error":"Incorrect password!"
                });
          }
         }
         else //If there is no user with this name
         {
            res.send({
                "code":401,
                "error":"No user with this name!"
                });
         }
      }

     });


}
//module for retrieving cat details usign authToken,id,name and username
exports.display_cat_details =  function(req,res)
{
  var requested_cat_properties = 
  {
    "id":   req.body.id,
    "name": req.body.name,
    "username": req.body.username
  }

  var token = req.header('authToken');
  if (!token) //If there is no token
    return res.status(401).send({ auth: false, "error": 'No token provided.' });
  //If the token do not match
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      //return res.status(500).send({ auth: false, message: 'Failed to authenticate token.Invalid token!' });}
    res.send({"code":500, "error": 'Failed to authenticate token.Invalid token!'})
  }
    else
    {
        //res.status(200).send(decoded);
        //retrieving the details from the database
        db.query("select birthdate, breed, username, id, imgUrl, name from cat_details where id = ? or name = ? or username=? order by lastSeenAt",[requested_cat_properties.id,requested_cat_properties.name,requested_cat_properties.username],
          function(error,results)
          {
            console.log(this.sql);
            if(error)
            {
              res.send({
                "code": 400,
                "error": "Error occured"
              });
            }
            else if(results.length>0)
            {
              res.send({
                "Success": 201, results
              });

            }
            else //If no parameters provided then throw this error
            {
              res.send({
                "code": 400,
                "error": "Invalid search criteria!"
              });
            }
        });
      }
      });
    }
//display the details of any random cat
  exports.display_random_cat = function(req,res)
  {
    db.query("SELECT imgUrl, name, breed FROM cat_details ORDER BY RAND() LIMIT 1",function(err,results){
      console.log(this.sql);
      if(err)
      {
        res.send({"error": 500, "Error":  "An error occurred"});
      }
      else
      {
        if(results.length<0){
          res.send({"error": 400, "Error":  "No records found!"});
          }
          else
          {
            res.send({"success": 201, results});
          }
        }
    });
    
  }
  
  
  
