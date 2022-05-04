const chai = require('chai');
let assert = chai.assert;
const { expect } = chai;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('convertHandler', () => {
    suite('getNum', () => {
      test('correctly read a whole number input', () => {
        expect(convertHandler.getNum('3km')).to.equal(3);
        expect(convertHandler.getNum('8gal')).to.equal(8);
      });

      test('correctly read a decimal number input', () => {
        expect(convertHandler.getNum('5.2km')).to.equal(5.2);
        expect(convertHandler.getNum('1.002km')).to.equal(1.002);
      });

      test('correctly read a fractional input', () => {
        expect(convertHandler.getNum('1/2km')).to.equal(0.5);
        expect(convertHandler.getNum('1/4l')).to.equal(0.25);
      });

      test('correctly return an error on a double-fraction', () => {
        expect(function () {
          convertHandler.getNum('1/2/3km');
        }).to.throw();
      });

      test('correctly default to a numerical input of 1 when no numerical input is provided', () => {
        expect(convertHandler.getNum('km')).to.equal(1);
      });
    });

    suite('getUnit', () => {
      test('correctly read each valid input unit', () => {
        expect(convertHandler.getUnit('100mi')).to.equal('mi');
        expect(convertHandler.getUnit('19km')).to.equal('km');
        expect(convertHandler.getUnit('9.7l')).to.equal('l');
        expect(convertHandler.getUnit('1/4gal')).to.equal('gal');
      });

      test('correctly return an error for an invalid input unit', () => {
        expect(() => {
          convertHandler.getUnit('12/7y7y7');
        }).to.throw();
      });
    });

    suite('getReturnUnit', () => {
      test('return the correct return unit for each valid input unit', () => {
        const unitConversion = [
          ['km', 'mi'],
          ['mi', 'km'],
          ['l', 'gal'],
          ['gal', 'L'],
        ];

        unitConversion.forEach((conversion) => {
          expect(convertHandler.getReturnUnit(conversion[0])).to.equal(
            conversion[1]
          );
        });
      });
    });

    suite('spelloutUnit', () => {
      test('correctly return the spelled-out string unit for each valid input unit', () => {
        const units = [
          ['km', 'kilometer'],
          ['l', 'liter'],
          ['mi', 'mile'],
          ['gal', 'gallon'],
        ];

        for (const [unit, unitString] of units) {
          expect(convertHandler.spellOutUnit(unit)).to.equal(unitString);
        }
      });
    });

    suite('convert', () => {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;

      function convert(initNum, unit) {
        const conversionTable = {
          gal: initNum * galToL,
          l: initNum / galToL,
          lb: initNum * lbsToKg,
          kg: initNum / lbsToKg,
          mi: initNum * miToKm,
          km: initNum / miToKm,
        };

        return conversionTable[unit];
      }

      const testCases = [
        [19, 'gal', 'l'],
        [23, 'l', 'gal'],
        [3.4, 'lb', 'kg'],
        [25, 'kg', 'lb'],
        [78, 'mi', 'km'],
        [66, 'km', 'mi'],
      ];

      test('correctly convert gal to L', () => {
        for (const [initNum, initUnit, returnUnit] of testCases) {
          expect(convertHandler.convert(initNum, initUnit)).to.equal(
            convert(initNum, initUnit)
          );
        }
      });
    });
  });
});
