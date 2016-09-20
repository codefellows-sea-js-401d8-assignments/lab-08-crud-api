# Crud API

## Getting Started

From the root directory, run `npm i` in the command line to install all necessary dependencies

## Using The App

- To start the server, run `node server.js`.

  - To upload initial data onto the server, use `curl  localhost:3000/api/?pokemon=rhyhorn -X POST -d '{"name": "rhyhorn", "type": "ground", "evolved": "rhydon"}'`

  - To then "GET" that data, use `curl  localhost:3000/api/?pokemon=rhyhorn -X GET`.

  - To update data already on server, use a "PUT" or "PATCH" request `curl  localhost:3000/api/?pokemon=rhyhorn -X PUT -d '{"name": "rhyhorn", "type": "rock", "final evolution": "rhydon"}'`

    - To then retrieve the updated data, simply perform a "GET" `curl  localhost:3000/api/?pokemon=rhyhorn -X GET`

  - To "DELETE" data from the server, use `curl  localhost:3000/api/?pokemon=rhyhorn -X DELETE`

  - To view all Pokemon currently on the server, use `curl  localhost:3000/api/pokemon/all -X GET`

## Testing

To run tests and the linter, run `gulp` from the command line
