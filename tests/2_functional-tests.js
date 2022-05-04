const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { expect } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('GET /api/convert', () => {
    test('Convert a valid input', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '10L' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.returnUnit).to.equal('gal');
          expect(body.initNum).to.equal(10);
          expect(body.initUnit).to.equal('L');
        });
    });

    test('Convert an invalid input unit', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '32g' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.type).to.equal('UNIT_ERROR');
        });
    });

    test('Convert an invalid number', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.type).to.equal('NUMBER_ERROR');
        });
    });

    test('Convert with no number', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: 'gal' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.returnUnit).to.equal('L');
          expect(body.returnNum).to.equal(3.78541);
          expect(body.initNum).to.equal(1);
          expect(body.initUnit).to.equal('gal');
        });
    });
  });
});
