'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../server');

describe('GET Requests', () => {
  const id = 12345;
  it('Test GET 404', (done) => {
    request(server)
    .get('/api/simple-resource-name?id=' + !id)
    .end((err, res) => {
      expect(404);
      expect(res.text).to.eql('not found');
      done();
    });
  });
  it('Test GET 400', (done) => {
    request(server)
    .get('/api/simple-resource-name')
    .end((err, res) => {
      expect(400);
      expect(res.text).to.eql('bad request');
      done();
    });
  });
  it('Test GET 200', (done) => {
    request(server)
    .get('/api/simple-resource-name')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('test');
      done();
    });
  });
});

describe('POST Requests', () => {

  it('Test POST 200', (done) => {
    request(server)
      .post('/api/simple-resource-name')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"msg": "hello world"}');
        done();
      });
  });

  it('Test POST 400', (done) => {
    request(server)
      .post('/')
      .end((err, res) => {
        expect(400);
        expect(res.text).to.equal('bad request');
        done();
      });
  });
});

describe('DELETE Requests', () => {
  it('Test DELETE', (done) => {
    request(server)
    .delete('/api/simple-resource-name')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(204);
      done();
    });
  });
});
