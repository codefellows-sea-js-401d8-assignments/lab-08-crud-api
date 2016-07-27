'use strict';

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
