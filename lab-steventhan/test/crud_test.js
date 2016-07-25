'use strict';

const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;

let port = 8000;
require('../_server').listen(port);

describe('the GET method', () => {
  it('GET /api/projects?id=11111 should be a 404 for valid request made with an id that was not found', (done) => {
    request(`localhost:${port}`)
      .get('/api/projects?id=11111')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.parse(res.text).msg).to.eql('Project id not found');
        done();
      });
  });

  it('GET /api/projects should be a 400 bad request if no id was provided', (done) => {
    request(`localhost:${port}`)
      .get('/api/projects')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(JSON.parse(res.text).msg).to.eql('Bad request, please specify project id. For e.g \'projects?id=11111\'');
        done();
      });
  });

  it('GET /api/projects should be a 200 OK if a existing id was provided', (done) => {
    request(`localhost:${port}`)
      .get('/api/projects?id=2c45ede0-523a-11e6-b124-27e69760e669')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).id).to.eql('2c45ede0-523a-11e6-b124-27e69760e669');
        done();
      });
  });
});

describe('the POST method', () => {
  it('POST /api/projects should be a 400 bad request if invalid json was posted', (done) => {
    request(`localhost:${port}`)
      .post('/api/projects')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('POST /api/projects should add the dummy project to the memory if a valid object is sent', (done) => {
    request(`localhost:${port}`)
      .post('/api/projects')
      .send({
        projectName: 'My HNG',
        technology: ['Python (Flask)', 'SQL (MySQL + SQLAlchemy)', 'CSS (Bootstrap + Insignia bootstrap admin theme)', 'JavaScript (jQuery, WebSockets)', 'Nginx', 'Gunicorn', 'AWS EC2 ubuntu instance'],
        github: 'https://github.com/steventhan/my-hng'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).projectName).to.eql('My HNG');
        expect(JSON.parse(res.text).technology.length).to.eql(7);
        expect(JSON.parse(res.text).github).to.eql('https://github.com/steventhan/my-hng');
        done();
      });
  });
});
