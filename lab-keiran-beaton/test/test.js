'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../test-server');
const serverPort = 5000;

describe('Crud API testing', () => {
  before(function(done) {
    server.listen(serverPort);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('test 1: should return a status code of 404 for unregistered routes', (done) => {
    request('localhost:' + serverPort)
      .get('/badroute')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('test 2: should return a status code of 404 for a valid request with an id that was not found', (done) => {
    request('localhost:' + serverPort + '/api')
      .get('/?pokemon=ivysaur')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('test 3: should return a status code of 400 for requests with no id', (done) => {
    request('localhost:' + serverPort + '/api')
      .get('/?pokemon=')
      .end(function(err) {
        expect(err).to.have.status(400, 'No id provided');
        done();
      });
  });

  it('test 4: should return a status code of 200 for requests with valid id', (done) => {
    request('localhost:' + serverPort + '/api')
      .get('/?pokemon=charmander')
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status code should be 200');
        done();
      });
  });

  it('test 5: should return a status code of 400 if no/invalid body provided for POST request', (done) => {
    request('localhost:' + serverPort + '/api')
      .post('/?pokemon=zubat')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('test 6: should return a status code of 200 if there is a valid body', (done) => {
    request('localhost:' + serverPort + '/api')
      .post('/?pokemon=koffing')
      .send({
        name: 'koffing',
        type: 'posion',
        evolved: 'weezing'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('test 7: should return a status code of 200 for valid PUT body', (done) => {
    request('localhost:' + serverPort + '/api')
      .put('/?pokemon=charmander')
      .send({
        name: 'new name',
        type: 'new type',
        evolved: 'new evolved',
        uuid: 'new uuid'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('test 8: should return a status code of 400 if no/invalid body provided for PUT request', (done) => {
    request('localhost:' + serverPort + '/api')
      .put('/?pokemon=charmander')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('test 9: should return a status code of 404 for a valid request with an id that was not found', (done) => {
    request('localhost:' + serverPort + '/api')
      .put('/?pokemon=ivysaur')
      .send({
        name: 'new name',
        type: 'new type',
        evolved: 'new evolved',
        uuid: 'new uuid'
      })
      .end(function(err) {
        expect(err).to.have.status(404, 'the status should be 404');
        done();
      });
  });
});
