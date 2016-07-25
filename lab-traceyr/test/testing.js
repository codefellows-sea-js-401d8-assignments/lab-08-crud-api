'use strict';
const net = require('net');
const expect = require('chai').expect;

const server = require('../server');
const port = 5000;

describe('testing ', () => {
  before((done)=>{
    server.listen(port, done);
  });
  after((done) =>{
    server.close(done);
  });
});
