'use strict';

const Movie = require('../model/Movie');
const response = require('vien-simple-router').response;

const movieList = {};

module.exports = function(router) {
  router.post('/movie', (req, res) => {
    if(req.body && req.body.name && req.body.rating) {
      let newMovie = new Movie(req.body.name, req.body.rating);
      movieList[newMovie.id] = newMovie;
      return response(200, newMovie)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.get('/movie', (req, res) => {
    if(req.url && req.url.query.id) {
      let movie = movieList[req.url.query.id];
      return response(200, movie)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.get('/movie/all', (req, res) => {
    console.log(movieList);
    let allMovies = Object.keys(movieList).map((id) => {
      return movieList[id];
    });

    return response(200, allMovies)(res);
  });
};
