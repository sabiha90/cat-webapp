# cat-webapp
A web application for saving and retrieving cat details.
<br>
<ol>
 <li> <a href="#point_1">Getting started</a>
 <li> <a href="#point_2">Description of API endpoints</a>
 <li> <a href="#point_3">Deployment </a>
 <li> <a href="#point_4">Built With <a>
 <li> <a href="#point_5">Authors</a>
</ol>

<p id="point_1"> <h2>Getting started with the Application</h2>
<p> <h3>Prerequisites </h3> </p>
       <ol>
       <li> A running version of Node.js. Check this <a href = "https://nodejs.org/en/download/package-manager/"> link </a> for instructions for installation of Node.js
       <li>MySql version
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
<br>POST request parameters
<br>Required:
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
Response
Success :
</p>
<p id ="api_2"> <h3> POST /cat/login </h3>
<br>Usage: <a href="#"> https://www.xyz.com/cat/login</a>
<br>
An API endpoint to login with an username and password.
<br>It will return an Auth Token and update the lastSeenAt field of the database.
<br>POST request parameters
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
    "failed": "Incorrect password!"
}
 ```
 <li>Error 401: No user with this username 
 
  ```
 {
    "code": 401,
    "failed": "No user with this name!"
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
</p>
<p id ="api_4"><h3> GET /cats/random </h3>
<br>Usage: <a href="#"> https://www.xyz.com/cats/random</a>
<br> Get the imageUrl, name and breed of a random cat
<br>No parameters required.

<li>Success 201: Display details of a random cat

```
{
    "Success": 201,
    "results": [
        {
            "imgUrl": url,
            "name": "sb",
            "breed": "cat_66"
        }
    ]
}

```

<li>Error 500: If unable to connect to the database or there is a syntax error in the mysql query

```
{
    "Failure": 500,
    "Error": "An error occurred"
}
```
<li>Error 400: If there are no records in the database

```
{
    "Failure": 400,
    "Error": "No records found!"
}

```
</p>
<p id="point_3"> <h2> Deployment </h2> </p>
Deployed using <a href="https://docs.aws.amazon.com/quickstarts/latest/webapp/welcome.html?icmpid=docs_eb_console_new"> Amazon ElasticBeanstalk </a> and <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html"> RDS </a>
<li> Url: http://catwebapp-env.szdwfbyehu.us-east-1.elasticbeanstalk.com/

<p id="point_4"> <h2> Built With </h2> </p>
<li> jsonwebtoken: To generate AuthToken
<li> validator: To validate username
<li> password-hash : To encrypt the password
<p id="point_5"> <h2> Authors </h2> </p>
<li> Sabiha Hussain Barlaskar
