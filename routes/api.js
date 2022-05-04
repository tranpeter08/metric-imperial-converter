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
      const initNum = getNum(input);
      let initUnit = getUnit(input);
      initUnit = initUnit === 'l' ? 'L' : initUnit;

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
      if (error.type) {
        if (error.type === 'UNIT_ERROR' || error.type === 'NUMBER_ERROR') {
          return res.status(400).send(error);
        }
      }

      res.status(500).send({ message: 'server error' });
    }
  });
};
