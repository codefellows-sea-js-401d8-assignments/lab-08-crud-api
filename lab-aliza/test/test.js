'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../server');
const Router = require('../route/router');

describe('Router', function() {
  beforeEach(function() {
    this.router = new Router('/api');
  });

  it('should be set up correctly', function() {
    expect(this.router.baseUrl).to.eql('/api');
    expect(this.router.routes).to.be.an('object');
    expect(this.router.routes.GET).to.be.an('object');
    expect(this.router.routes.POST).to.be.an('object');
    expect(this.router.routes.PUT).to.be.an('object');
    expect(this.router.routes.PATCH).to.be.an('object');
    expect(this.router.routes.DELETE).to.be.an('object');
  });

  it('should call route functions', function() {
    let called;
    let testRes = {
      'test': true
    };
    let testReq = {
      method: 'GET',
      url: '/api/test'
    };
    this.router.get('/test', function(req, res) {
      called = true;
      expect(res.test).to.eql(true);
    });
    this.router.route()(testReq, testRes);
    expect(called).to.eql(true);
  });

  it('should have a 404 page', function() {
    let called = 0;
    let testReq = {
      method: 'GET',
      url: 'doesnotexist'
    };
    let testRes = {
      writeHead: function(statusCode, header) {
        called++;
        expect(statusCode).to.eql(404);
        expect(header['Content-Type']).to.eql('text/plain');
      },
      write: function(text) {
        called++;
        expect(text).to.eql('not found');
      },
      end: function(){
        called++;
      }
    };
    this.router.route()(testReq, testRes);
    expect(called).to.eql(3);
  });
});

describe('GET Requests', function() {

  it('Test GET 404', function(done) {
    request(server)
    .get('/api/test')
    .end(function(err, res) {
      expect(404);
      expect(res.text).to.eql('not found');
      done();
    });
  });
  it('Test GET 400', function(done) {
    request(server)
    .get('/api/users/')
    .end(function(err, res) {
      expect(400);
      expect(res.text).to.eql('bad request');
      done();
    });
  });

  it('Test GET 200', function(done) {
    request(server)
    .get('/api/users?id=1234567')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text).id).to.eql('1234567');
      done();
    });
  });
});

describe('POST Requests', function() {

  it('Test POST 200', function(done) {
    request(server)
      .post('/api/user')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"msg": "hello world"}');
        //change to res.body to check for parsed json
        done();
      });
  });

  it('Test POST 400', function(done) {
    request(server)
      .post('/')
      .end(function(err, res) {
        expect(400);
        expect(res.text).to.equal('bad request');
        done();
      });
  });
});

describe('DELETE Requests', () => {
  it('Test DELETE', function(done) {
    request(server)
    .delete('/api/user')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(204);
      done();
    });
  });
});
