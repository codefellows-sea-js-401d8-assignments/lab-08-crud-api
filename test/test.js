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
    it('GET /api/movie with a bad id should get a 404 response', (done) => {
      request('localhost:3000')
        .get('/api/movie?id=badid')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('movie not found');
          done();
        });
    });
  });

  describe('testing GET functionality with no ID', () => {
    it('GET /api/movie with no id should get a 400 response', (done) => {
      request('localhost:3000')
        .get('/api/movie')
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });
  });

  describe('testing GET functionality with a good test ID', () => {
    it('GET /api/movie with no id should get a 400 response', (done) => {
      request('localhost:3000')
        .get('/api/movie?id=123')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^test$/);
          expect(res.body).to.have.property('rating').to.be.a('number').and.to.match(/^322$/);
          done();
        });
    });
  });

  describe('testing POST functionality with no body', () => {
    it('POST /api/movie with no body should get a 400 response', (done) => {
      request('localhost:3000')
        .post('/api/movie')
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });
  });

  describe('testing POST functionality with valid body', () => {
    it('POST /api/movie with valid body should get a 200 response', (done) => {
      request('localhost:3000')
        .post('/api/movie')
        .send({name: 'newTestMovie', rating: 322})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^newTestMovie$/);
          expect(res.body).to.have.property('rating').to.be.a('number').and.to.match(/^322$/);
          done();
        });
    });
  });

  describe('testing GET functionality to /api/movie/all', () => {
    it('GET /api/movie/all should get a 200 response', (done) => {
      request('localhost:3000')
        .get('/api/movie/all')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
