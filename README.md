#lab-08-in-memory-single-resource-api

## To run server
Clone down then run in terminal:
```
npm i
```
To run tests and lint files in terminal type:
```
gulp
```
To start server in terminal:
```
node server.js
```

## Using httpie to interact with server on the command line
To POST a new movie to the server:
```
http POST localhost:3000/api/movie "name=example movie name" "rating = 322"
```
To GET an movie from the server:
```
http GET localhost:3000/api/movie?id=exampleid
```
To GET all movies from the server:
```
http GET localhost:3000/api/movie/all
```
To DELETE a movie from the server:
```
http DELETE localhost:3000/api/movie?id=exampleid
```
To PUT new movie properties to the server:
```
http PUT localhost:3000/api/movie?id=exampleid "name=new movie name" "rating=321"
```
