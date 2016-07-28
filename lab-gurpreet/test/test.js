'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const testServer = require('../server');

describe('testing route module', function(){
  after(function (done) {
    testServer.close(function() {
      done();
    });
  });
  describe('testing GET functionality with bad ID', () => {
    it('GET /api/car with a bad id should get a 404 response', (done) => {
      request('localhost:3000')
          .get('/api/car?id=badid')
          .end(function(err, res) {
            expect(res).to.have.status(404);
            expect(res.text).to.have.string('car not found');
            done();
          });
    });
  });

  describe('testing GET functionality with no ID', () => {
    it('GET /api/car with no id should get a 400 response', (done) => {
      request('localhost:3000')
          .get('/api/car')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.text).to.have.string('bad request');
            done();
          });
    });
  });

  describe('testing GET functionality with a good test ID', () => {
    it('GET /api/car with no id should get a 400 response', (done) => {
      request('localhost:3000')
          .get('/api/car?id=123')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^test$/);
            expect(res.body).to.have.property('model').to.be.a('number').and.to.match(/^322$/);
            done();
          });
    });
  });

  describe('testing POST functionality with no body', () => {
    it('POST /api/car with no body should get a 400 response', (done) => {
      request('localhost:3000')
          .post('/api/car')
          .end(function(err, res) {
            // debugger;
            expect(res.status).to.eql(400);
            expect(res.text).to.have.string('bad request');
            done();
          });
    });
  });

  describe('testing POST functionality with valid body', () => {
    it('POST /api/car with valid body should get a 200 response', (done) => {
      request('localhost:3000')
          .post('/api/car')
          .send({name: 'newTestCar', model: 322})
          .end(function(err, res) {
            expect(res.status).to.eql(200);
            expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^newTestCar$/);
            expect(res.body).to.have.property('model').to.be.a('number').and.to.match(/^322$/);
            done();
          });
    });
  });

  describe('testing GET functionality to /api/car/all', () => {
    it('GET /api/car/all should get a 200 response', (done) => {
      request('localhost:3000')
          .get('/api/car/all')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
          });
    });
  });
});
