'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../server');

describe('POST testing', () => {
  it('Test POST 200', (done) => {
    request(server)
      .post('/api/user')
      .send({
        name: 'aliza'
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('id', 'name', 'creationDate');
        expect(res.body.name).to.eql('aliza');
        done();
      });
  });
  it('test POST 400', (done) => {
    request(server)
    .post('/api/user')
    .send({
      blah: 'blah'
    })
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.eql('bad request');
      done();
    });
  });
});

describe('GET testing', () => {
  let users = {};
  before((done) => {
    request(server)
      .post('/api/user')
      .send({
        name: 'aliza'
      })
    .end(function(err, res){
      users.id = res.body.id;
      done();
    });
  });
  it('test GET 404', (done) => {
    request(server)
    .get('/api/user/123')
    .end(function(err, res) {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('not found');
      done();
    });
  });
  it('test GET 400', (done) => {
    request(server)
    .get('/api/user')
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.eql('bad request');
      done();
    });
  });
  it('test GET 200', (done) => {
    request(server)
    .get('/api/user?id=' + users.id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('aliza');
      done();
    });
  });
});
