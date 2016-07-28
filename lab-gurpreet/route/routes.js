'use strict';

const car = require('../model/car');
const response = require('../lib/router').response;
const carList = {};

let testID = '123';
carList[testID] =new car('test',322);

module.exports = function(router) {

  router.get('/car', (req, res) => {
    if(req.url && req.url.query.id) {
      let car = carList[req.url.query.id];
      if (car)
        return response(200, car)(res);
      else
        return response(404, 'car not found')(res);
    }
    return response(400, 'bad request')(res);
  });

  router.post('/car', (req, res) => {
    console.log(req.body);
    if(req.body && req.body.name && req.body.model) {
      let newCar = new car(req.body.name, req.body.model);
      carList[newCar.id] = newCar;
      return response(200, newCar)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.put('/car', (req, res) => {
    let car;
    if(req.url && req.url.query.id) {
      car = carList[req.url.query.id];
    } else if (req.body && req.body.id) {
      car = carList[req.body.id];
    }
    if(car && req.body) {
      car.name = req.body.name || car.name;
      car.model = req.body.model || car.model;
      return response(200, car)(res);
    }
    return response(400, 'bad request')(res);
  });

  router.delete('/car', (req, res) => {
    if(req.url && req.url.query.id) {
      let car = carList[req.url.query.id];
      if(car) {
        delete carList[req.url.query.id];
        return response(204, null)(res);
      }
      return response(400, 'bad request')(res);
    }
  });

  router.get('/car/all', (req, res) => {
    let allCars = Object.keys(carList).map((id) => {
      return carList[id];
    });
    return response(200, allCars)(res);
  });
};
