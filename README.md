# cat-webapp
A web application for saving and retrieving cat details.
<br>
The documentation consists of:
<html>
<ol>
 <li> <a href="#point_1"><h4>Getting started</h4></a></li>
 <li> <a href="#point_2">Description of API endpoints</a>
</ol>

<p id="point_1"> 1. Getting started with the Application
 Tools required to run the application
       <ol>
       <li> A running version of Node.js. Check this <a href = "https://nodejs.org/en/download/package-manager/"> link </a> for instructions for installation of Node.js
       <li>MySql version
   </ol>
                                                                                                               
 Clone this repository into your local machine
 To install all the dependencies present in package.json, run
 ```
 npm install
 ```
 Edit the db_connection.js file with your database credentials
 Finally, to run the application, run
 
 ```
 npm start
 ```
 The application by default will run at the port 3000.

 ## API Endpoints used
 <a href = "#api_1"><h3> POST /cat/register </h3> </a>
 <a href = "#api_2"><h3> POST /cat/login </h3> </a>
 <a href = "#api_3"><h3> GET /cats </h3> </a>
 <a href = "#api_4"><h3> GET /cats/random </h3> </a>

<p id="api_1">  <h3> POST /cat/register </h3> 
Usage: <a href="#"> https://www.xyz.com/cat/register
API endpoint to save the details of cat in the database.
Parameters sent with the post request:
 Required:
<ul>
 <li>name: String
 <li>password: String
 <li>username: String
 <li>weight: Float
 </ul>

 Optional:
  <ul>
 <li> birthdate:Date
 <li>breed: String?
 <li> imageUrl: String?
 </ul>

</p>

<p id ="api_2"> <h3> POST /cat/login </h3></p>
<p id ="api_2"> <h3> POST /cat/login </h3></p>
<p id ="api_3"> <h3> GET /cats </h3></p>
<p id ="api_4"> <h3> GET /cats/random </h3></p>

