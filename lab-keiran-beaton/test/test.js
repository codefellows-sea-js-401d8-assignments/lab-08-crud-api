'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

require('../server');

describe('testing http server', () => {
  it('testing get', (done) => {
    request('localhost:3000')
    .get('/')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('testing post', (done) => {
    request('localhost:3000')
    .post('/api/user')
    .send({name: 'keiran', age: 24})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.name).to.eql('keiran');
      done();
    });
  });
});
