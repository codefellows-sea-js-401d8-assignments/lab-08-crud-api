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

  it('should return a status code of 404 for a valid request with an id that was not found', (done) => {
    request('localhost:3000/api')
      .put('/?pokemon=ivysaur')
      .send({
        name: 'Justin Bieber',
        type: 'Pop Singer',
        'final evolution': 'off the charts',
        uuid: 'the Biebs'
      })
      .end(function(err) {
        expect(err).to.have.status(404, 'the status should be 404');
        done();
      });
  });


});
