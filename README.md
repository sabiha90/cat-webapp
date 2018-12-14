# cat-webapp
A web application for saving and retrieving cat details. The application has GET and POST API endpoints.
<br>
<ol>
 <li> <a href="#point_1">Getting started</a>
 <li> <a href="#point_2">Description of API endpoints</a>
 <li> <a href="#point_3">Directory structure</a>
 <li> <a href="#point_4">Deployment </a>
 <li> <a href="#point_5">Built With <a>
 <li> <a href="#point_6">Authors</a>
</ol>

<p id="point_1"> <h2>Getting started with the Application</h2>
<p> <h3>Prerequisites </h3> </p>
       <ol>
       <li> A running version of Node.js. Check this <a href = "https://nodejs.org/en/download/package-manager/"> link </a> for instructions for installation of Node.js
       <li>MySql version 5.6.40
   </ol>
<p> <h3> Running the application </h3> </p>                                                                                              
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

<p id="point_2"><h2> Description of API endpoints </h2> </p>
<p id="api_1">  <h3> POST /cat/register </h3> </p>
<br>Usage:<a href="#"> https://www.xyz.com/cat/register </a>
<br>An API endpoint to save the details of cat in the database.
<br>POST Request parameters
<br>Required:
<ul>
 <li>name: String
 <li>password: String
 <li>username: String
 <li>weight: Float
 </ul>
 Optional:
  <ul>
 <li> birthdate:Date (YYYY-MM-DD)
 <li>breed: String?
 <li> imageUrl: String?
 </ul>
Response
<li>Success 201 : User added successfully
 
```
{
  "code":201,
  "success": "User added successfully"
 }
```
<li> Error 500: User already exists
 
 ```
 {
   "code": 400",
   "error":"user already exists!"
 }
 ```
 <li> Error : Invalid credentials
 
 ```
 {
    "errors": [
        {
            "location": "body",
            "param": "username",
            "value": "sabiha23",
            "msg": "Invalid username!"
        },
        {
            "location": "body",
            "param": "password",
            "value": "pass",
            "msg": "Minimum length of password is 8"
        },
        {
            "location": "body",
            "param": "breed",
            "value": "cat_breed_1",
            "msg": "Must contain only letters (a-zA-Z"
        }
    ]
}

 ```
</p>
<p id ="api_2"> <h3> POST /cat/login </h3></p>
Usage: <a href="#"> https://www.xyz.com/cat/login</a>
<br>
An API endpoint to login with an username and password.
<br>It will return an Auth Token and update the lastSeenAt field of the database.
<br>POST Request parameters
<br>Required:
<ul>
    <li> username: String
    <li> password: String
 </ul>
 
 Response
 
   <li>Sucess 201: Successful Login 
 
 ```
 {
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDQ3MzE3MDYsImV4cCI6MTU0NDgxODEwNn0.VwFW8T8FE7JAXLU_nT9gZ2xOh1L7NKFUqaw4-NlB61M",
    "code": 201,
    "success": "updated sucessfully"
}
 ```
 <li>Error 401: Incorrect password
  
 ```
 {
    "code": 401,
    "error": "Incorrect password!"
}
 ```
 <li>Error 401: No user with this username 
 
  ```
 {
    "code": 401,
    "error": "No user with this name!"
}
 ```
<p id ="api_3"> <h3> GET /cats </h3>
<br>Usage: <a href="#"> https://www.xyz.com/cats</a>
<br>An API endpoint to get an array of cats (birthdate,breed, username, id, imageUrl, name) matching that criteria, sorted by lastSeenAt.
<br>GET Request Parameters
<br> Optional
<ul>
<li> id: String
<li> name: String
<li> username: String
</ul>
<br> Response
<li> Success 201: Retrieved cat details successfully
 
```
 {
    "code": 201,
    "results": [
        {
            "birthdate": "1990-05-04T07:00:00.000Z",
            "breed": "cat_1",
            "username": "j90",
            "id": 1,
            "imgUrl": null,
            "name": "John"
        },
        {
            "birthdate": "1990-05-13T07:00:00.000Z",
            "breed": "cat_3",
            "username": "s90",
            "id": 4,
            "imgUrl": null,
            "name": "sabiha"
        },
```

<li> Error 401: No authorization token was provide
 
 ```
 {
    "code": 401,
    "auth": false,
    "error": "No token provided."
}
 ```
 
<li> Error 500: Invalid auth Token
 
 ```
 {
   "code":500, 
   "error": 'Failed to authenticate token.Invalid token!'
 }
 ```
</p>
<p id ="api_4"><h3> GET /cats/random </h3>
<br>Usage: <a href="#"> https://www.xyz.com/cats/random</a>
<br> Get the imageUrl, name and breed of a random cat
<br>No parameters required.

<li>Success 201: Display details of a random cat

```
{
    "code": 201,
    "results": [
        {
            "imgUrl": url,
            "name": "sb",
            "breed": "cat_66"
        }
    ]
}
```

<li>Error 400: If there are no records in the database

```
{
    "code": 400,
    "error": "No records found!"
}
```

</p>

<p id="point_3"><h2> Directory structure </h2> </p>

```
|app.js
|package.json
|--routes
|   |--index.js
|   |--controllers
|       |--cat_controller.js
|   |--config
|       |--config.js
|   |--db
|       |--db_connection.js
|       |--database_schema.sql
|--views
|   |--index.jade
|   |--error.jade
|   |--layout.jade

```
<br> The routes are present in the index.js file and are forwarded to the controller functions present in the controllers folder.
<br> The db folder consists of database schema in the db_connection.js file and the database model in the database_schema.sql
<br> The config folder consists of the config.js file for the authToken generation.

<p id="point_4"> <h2> Deployment </h2> </p>
Deployed using <a href="https://docs.aws.amazon.com/quickstarts/latest/webapp/welcome.html?icmpid=docs_eb_console_new"> Amazon ElasticBeanstalk </a> and <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html"> RDS </a>
<br>Url: http://catwebapp-env.szdwfbyehu.us-east-1.elasticbeanstalk.com/

<p id="point_5"> <h2> Built With </h2> </p>
<li> jsonwebtoken: To generate AuthToken
<li> express-validator: To validate input parameters like birthdate, username, password etc 
<li> password-hash : To encrypt the password
<p id="point_6"> <h2> Authors </h2> </p>
<li> Sabiha Hussain Barlaskar
