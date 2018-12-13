var express = require('express');
var passwordHash = require('password-hash');
var validator = require('validator');
var db = require('../db/db_connection');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var rn = require('random-number');
var Promise = require('promise');

exports.home_page = function(req, res, next) {
  res.render('index', { title: 'Welcome to Cat World!' });
}
exports.register_cat = function(req, res){
    var today = new Date();
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
    validate(cat_properties,res,req);
    console.log(cat_properties.username);
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
    else if(results.length>0)
    {
      res.send({"message":"user already exists!"});
    }
    else
    {

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

exports.login_user = function(req,res)
{ 
  console.log('inside login');

  var user_details = {
    "username" : req.body.username,
    "password" : req.body.password,
    "lastSeenAt" :new Date()
  }
  db.query('SELECT * FROM cat_details WHERE username = ?',user_details.username, function (error, results, fields) {
    if(error)
     {
       res.send({
        "code":400,
        "failed":"error ocurred"
      });
     }
    else
     {
       console.log(results.length);
       if(results.length > 0)
        {
          if(passwordHash.verify(user_details.password, results[0].password) || user_details.password == results[0].password)
          { 
            console.log("logged in with password");
            db.query('Update cat_details set lastSeenAt = ? where username = ? and password = ?',[user_details.lastSeenAt,user_details.username,passwordHash.generate(user_details.password)], function (error, results, fields) {
            if(error)
              {
                console.log("error ocurred",error);
                res.send({
                "code":500,
                "failed":"error ocurred"
                });
              }
            else
            {
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
          else
          {
              res.send({
                "code":401,
                "failed":"Incorrect password!"
                });
          }
         }
         else
         {
            res.send({
                "code":401,
                "failed":"No user with this name!"
                });
         }
      }

     });


}
exports.display_cat_details =  function(req,res)
{
  var requested_cat_properties = 
  {
    "id":   req.body.id,
    "name": req.body.name,
    "username": req.body.username
  }

  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      //return res.status(500).send({ auth: false, message: 'Failed to authenticate token.Invalid token!' });}
    res.send({"code":500, "message": 'Failed to authenticate token.Invalid token!'})
  }
    else
    {
        //res.status(200).send(decoded);
        db.query("select birthdate, breed, username, id, imgUrl, name from cat_details where id = ? or name = ? or username=? order by lastSeenAt",[requested_cat_properties.id,requested_cat_properties.name,requested_cat_properties.username],
          function(error,results)
          {
            console.log(this.sql);
            if(error)
            {
              res.send({
                "code": 400,
                "Failure": "invalid search criteria!"
              });
            }
            else
            {
              res.send({
                "Success": 201, results
              });

            }
        });
      }
      });
    }

  exports.display_random_cat = function(req,res)
  {
    db.query("SELECT imgUrl, name, breed FROM cat_details ORDER BY RAND() LIMIT 1",function(err,results){
      console.log(this.sql);
      if(err)
      {
        res.send({"Failure": 500, "Error":  "An error occurred"});
      }
      else
      {
        if(results.length<0){
          res.send({"Failure": 400, "Error":  "No records found!"});
          }
          else
          {
            res.send({"Success": 201, results});
          }
        }
    });
    
  }
  
  function validate(cat_properties,res,req){
  if(cat_properties.name === undefined)
  {
    res.send({"message":"Name is missing!"});
  }
  else if(req.body.password.length<8)
  {
    res.send({"message":"Password should be more than 8 characters!"});
  }
  else if(!validator.isEmail(cat_properties.username))
  {
    res.send({"message":"Invalid user name"});
  }
}

