const supertest = require('supertest');
const expect = require('chai').expect;

const server = require('../lib/server');

describe('/api/pokemon', () => {
  describe('POST', () => {
    it('Creates new pokemon', () => (
      supertest(server)
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
        })
        .expect(200)
        .expect('Content-Type', 'application/json')
        .expect((res) => {
          expect(res.body.id).to.exist;
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        })
    ));
  });
});
