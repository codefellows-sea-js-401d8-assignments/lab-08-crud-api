'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../lib/server.js');
const port = 3000;

describe('Crud API testing', () => {
  before(function(done) {
    server.listen(port, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should return a status code of 404 for unregistered routes', (done) => {
    request('localhost:3000')
      .get('/bieber')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('should return a status code of 404 for a valid request with an id that was not found', (done) => {
    request('localhost:3000/api')
      .get('/?pokemon=ivysaur')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('should return a status code of 400 for requests with no id', (done) => {
    request('localhost:3000/api')
      .get('/?pokemon=')
      .end(function(err) {
        expect(err).to.have.status(400, 'No id provided');
        done();
      });
  });

  it('should return a status code of 200 for requests with valid id', (done) => {
    request('localhost:3000/api')
      .get('/?pokemon=squirtle')
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status code should be 200');
        done();
      });
  });

  it('should return a status code of 400 if no/invalid body provided for POST request', (done) => {
    request('localhost:3000/api')
      .post('/?pokemon=charmander')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('should return a status code of 200 if there is a valid body', (done) => {
    request('localhost:3000/api')
      .post('/?pokemon=charmander')
      .send({
        name: 'charmander',
        type: 'fire',
        'final evolution': 'charizard'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('should return a status code of 200 for valid PUT body', (done) => {
    request('localhost:3000/api')
      .put('/?pokemon=squirtle')
      .send({
        name: 'Justin Bieber',
        type: 'Pop Singer',
        'final evolution': 'off the charts',
        uuid: 'the Biebs'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('should return a status code of 400 if no/invalid body provided for PUT request', (done) => {
    request('localhost:3000/api')
      .put('/?pokemon=charmander')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
      });
    done();
  });

});
