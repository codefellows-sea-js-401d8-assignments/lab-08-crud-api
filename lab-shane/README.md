# Lab 08: Crud Api

This project creates an http server through which a user can use get or post data about pokemon.

## Getting Started
To begin, simply clone down the repo and run it in the terminal via `npm i`. All commands outlaid below will assume input in terminal.

- To start the server, use `node lib/server.js`.

  - To input initial data onto the server, use `curl  localhost:3000/api/?pokemon=pikachu -X POST -d '{"name": "pikachu", "type": "lightning", "final evolution": "Raichu"}'`

  - To then "GET" that data, use `curl  localhost:3000/api/?pokemon=pikachu -X GET`.
