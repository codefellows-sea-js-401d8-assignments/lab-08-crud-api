![Triforce](./resources/triforce2.gif)

#CRUD API#

###Summary###
Basic CRUD application allowing you to POST pokemon info and retrieve it with a GET request

###Instructions###
From the root directory of 'lab-jeff' run the following command in your terminal:

`npm install`


###Test###

To run the tests, linter and watcher type the command:
`gulp`

To add a Pokemon follow the below format:

POST: `curl -H "Content-Type: application/json" -X POST -d '{"name":"Charizard", "type":"fire"}' http://localhost:3000/api/pokemon`

To retrieve a Pokemon follow the below format, "name" must match pokemon your created with POST.

GET: `curl http://localhost:3000/api/pokemon?name=Charizard`


`Jeff Gebhardt - CF JS 401`
