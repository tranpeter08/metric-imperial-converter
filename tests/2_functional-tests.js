const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { expect } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert a valid input', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '10L' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          const { body } = res;
          assert.equal(res.status, 200);
          assert.equal(body.returnUnit, 'gal');
          assert.equal(body.initNum, 10);
          assert.equal(body.initUnit, 'L');
        });
    });

    test('Convert an invalid input unit', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '32g' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          assert.equal(res.status, 200);
          assert.typeOf(res.text, 'string');
          assert.equal(res.text, 'invalid unit');
        });
    });

    test('Convert an invalid number', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';
          assert.equal(res.status, 200);
          assert.typeOf(res.text, 'string');
          assert.equal(res.text, 'invalid number');
        });
    });

  test('Convert an invalid number AND unit', () => {
    chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kgs' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';
          assert.equal(res.status, 200);
          assert.typeOf(res.text, 'string');
          assert.equal(res.text, 'invalid number and unit');
        });
  })

    test('Convert with no number', () => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: 'gal' })
        .end((error, res) => {
          if (error) throw 'something went wrong...';

          const { body } = res;
          assert.equal(res.status, 200);
          assert.equal(body.returnUnit, 'L');
          assert.equal(body.returnNum, 3.78541);
          assert.equal(body.initNum, 1);
          assert.equal(body.initUnit, 'gal');
        });
    });
});
