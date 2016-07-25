'use strict';

const chai = require('chai');
const chaiHttp = requre('chai-http');

const server = require('../server');
const port = 5000;

describe('testing ', () => {
  before((done)=>{
    server.listen(port, done);
  });
  after((done) =>{
    server.close(done);
  });
  it('this', () =>{
    expect(true).to.eql(true);
  });
});
