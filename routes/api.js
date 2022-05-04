'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    try {
      const { query } = req;
      const { getNum, getUnit, getReturnUnit, convert, getString } =
        convertHandler;

      if (!query.input) return res.end(400);

      const { input } = query;
      const errors = [];
      
      const initNum = getNum(input);
      let initUnit = getUnit(input);
      initUnit = initUnit === 'l' ? 'L' : initUnit;

      if (initNum === 'INVALID_NUMBER') {
        errors.push('number');
      }

      if (initUnit === 'INVALID_UNIT') {
          errors.push('unit')
      }

      if (errors.length) throw ({errors});

      const returnNum = Math.round(convert(initNum, initUnit) * 1e5) / 1e5;
      const returnUnit = getReturnUnit(initUnit);
      const string = getString(initNum, initUnit, returnNum, returnUnit);

      return res.status(200).json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
    } catch (error) {
      if (error.errors) {
          const message = `invalid ${error.errors.join(' and ')}`
          return res.status(200).send(message);
        
      }

      res.status(500).send({ message: 'server error' });
    }
  });
};
