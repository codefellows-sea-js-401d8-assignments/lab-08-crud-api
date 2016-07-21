![cf](https://i.imgur.com/7v5ASc8.png) lab-08-in-memory-single-resource-api
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* Create these directorys
 * lib -> supporting modules
 * model -> app resource constructors
 * route -> app resource routes
 * controller -> app resource controllers
 * test -> app module tests
* create a package.json that lists all dependencies and developer dependencies
* include an .eslintrc
* include a .gitignore
* create a gulpfile
 * have a lint task for running eslint
 * have a test task for running mocha
 * have a nodemon task that restarts your server any time a change has been bade to your **.js** files
 * have a default task for running the lint and mocha tasks

# Directions
* Create a HTTP Server using the http module
* Create a Object Constructor that creates a _simple resource_ with at least 3 properties
 * An `id` property that is set to a unique **node-uuid** id is required
 * Also include two other properties of your choice (like name, creationDate, etc.) 
* Create a body parser that uses Promises to parse the json in the body of `POST`, `PUT`, or `DELETE` requests
* Create a url parser that returns a promise and uses nodes `url` and `querystring` modules parse the request url
* Create a Router Constructor that manages requests to `GET`, `POST`, `PUT`, and `DELETE` requests
* Create a route for doing **CRUD** operations on your _simple resource_
 * when instances of a resource are created they should be stored on an object using the `uuid` as the key
 * the value associated with the key should be the instance of the resource

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
 * pass data as stringifed json in the body of a post request to create a resource
* `GET` request 
 * pass an `?id=<uuid>` in the query string to retrieve a specific resource as json
* `DELETE` request
 * pass an `?id=<uuid>` in the query string to retrieve a specific resource as json
 * on success respond with a **204** no content response

## Tests 
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `GET` - test 400, responds with 'bad request' if no id was provided in the request
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id 
 * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body

## Bonus
* **1pts** a `GET` request to `/api/simple-resource-name/all` should retrun an array of all of the ids for that resource
* **1pt** write a `PUT` request to `/api/simple-resource-name?id=<uuid>` 
 * pass data as stringifed JSON that will be used to update a previously created _simple resource_
 * write 200, 400, and 404 tests



