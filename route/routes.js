'use strict';

const Movie = require('../model/Movie');
const response = require('vien-simple-router').response;

const movieList = {};

module.exports = function(router) {

  router.get('/movie', (req, res) => {
    if(req.url && req.url.query.id) {
      let movie = movieList[req.url.query.id];
      return response(200, movie)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.post('/movie', (req, res) => {
    if(req.body && req.body.name && req.body.rating) {
      let newMovie = new Movie(req.body.name, req.body.rating);
      movieList[newMovie.id] = newMovie;
      return response(200, newMovie)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.put('/movie', (req, res) => {
    let movie;
    if(req.url && req.url.query.id) {
      movie = movieList[req.url.query.id];
    } else if (req.body && req.body.id) {
      movie = movieList[req.body.id];
    }
    if(movie && req.body) {
      movie.name = req.body.name || movie.name;
      movie.rating = req.body.rating || movie.rating;
      return response(200, movie)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.delete('/movie', (req, res) => {
    if(req.url && req.url.query.id) {
      let movie = movieList[req.url.query.id];
      if(movie) {
        delete movieList[req.url.query.id];
        return response(204, null)(res);
      }
      return response(400, 'bad request')(res);
    }
  });

  router.get('/movie/all', (req, res) => {
    console.log(movieList);
    let allMovies = Object.keys(movieList).map((id) => {
      return movieList[id];
    });
    return response(200, allMovies)(res);
  });
};
