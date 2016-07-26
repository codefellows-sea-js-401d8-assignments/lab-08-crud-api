# Lab 08: Crud Api

This project creates an http server through which a user can use upload and access data about Pokemon.

## Getting Started
To begin, simply clone down the repo and run it in the terminal via `npm i`. All commands outlaid below will assume input in terminal.

- To start the server, use `node lib/server.js`.

  - To upload initial data onto the server, use `curl  localhost:3000/api/?pokemon=pikachu -X POST -d '{"name": "pikachu", "type": "lightning", "final evolution": "Raichu"}'`

  - To then "GET" that data, use `curl  localhost:3000/api/?pokemon=pikachu -X GET`.

  - To update data already on server, use a "PUT" or "PATCH" request `curl  localhost:3000/api/?pokemon=pikachu -X PUT -d '{"name": "pikachu", "type": "awesome", "final evolution": "Beyonce"}'`

    - To then retrieve the updated data, simply perform a "GET" `curl  localhost:3000/api/?pokemon=pikachu -X GET`

  - To "DELETE" data from the server, use `curl  localhost:3000/api/?pokemon=pikachu -X DELETE`

  - To view all Pokemon currently on the server, use `curl  localhost:3000/api/pokemon/all -X GET`

- To run any tests or file linting, use `gulp`
