const chai = require('chai');
let assert = chai.assert;
const { expect } = chai;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input.', () => {
    expect(convertHandler.getNum('3km')).to.equal(3);
    expect(convertHandler.getNum('8gal')).to.equal(8);
  })

  test('convertHandler should correctly read a decimal number input', () => {

    expect(convertHandler.getNum('5.2km')).to.equal(5.2);
    expect(convertHandler.getNum('1.002km')).to.equal(1.002);
  })

  test('convertHandler should correctly read a fractional input.', () => {

    expect(convertHandler.getNum('1/2km')).to.equal(0.5);
    expect(convertHandler.getNum('1/4l')).to.equal(0.25);
  })

  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    expect(convertHandler.getNum('1.8/3.6km')).to.equal(0.5);
    expect(convertHandler.getNum('.06/.24l')).to.equal(0.25);
  })

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
    expect(convertHandler.getNum('1/2/3km')).to.equal('INVALID_NUMBER');
  })



  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    expect(convertHandler.getNum('km')).to.equal(1);
  })

  test('convertHandler should correctly read each valid input unit.', () => {
    expect(convertHandler.getUnit('100mi')).to.equal('mi');
    expect(convertHandler.getUnit('19km')).to.equal('km');
    expect(convertHandler.getUnit('9.7l')).to.equal('L');
    expect(convertHandler.getUnit('1/4gal')).to.equal('gal');
  })

  test('convertHandler should correctly return an error for an invalid input unit.', () => {
    expect(convertHandler.getUnit('1/4lb')).to.equal('INVALID_UNIT');
  })

  test('convertHandler should return the correct return unit for each valid input unit.', () => {
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

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
    const units = [
      ['km', 'kilometer'],
      ['l', 'liter'],
      ['mi', 'mile'],
      ['gal', 'gallon'],
      ['lbs', 'pound'],
      ['kg', 'kilogram']
    ];

    for (const [unit, unitString] of units) {
      expect(convertHandler.spellOutUnit(unit)).to.equal(unitString);
    }

  })

  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  function convert(initNum, unit) {
    const conversionTable = {
      gal: initNum * galToL,
      l: initNum / galToL,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      mi: initNum * miToKm,
      km: initNum / miToKm,
    };

    return conversionTable[unit];
  }

  test('convertHandler should correctly convert gal to L.', () => {
    const [initNum, initUnit] = [19, 'gal'];

    expect(convertHandler.convert(initNum, initUnit)).to.equal(
      convert(initNum, initUnit)
    );
  })

  test('convertHandler should correctly convert L to gal', () => {
    const [initNum, initUnit] = [23, 'l'];
    expect(convertHandler.convert(initNum, initUnit)).to.equal(
      convert(initNum, initUnit)
    );
  })

  test('convertHandler should correctly convert mi to km.', () => {
    const [initNum, initUnit] = [78, 'mi'];
    expect(convertHandler.convert(initNum, initUnit)).to.equal(
      convert(initNum, initUnit)
    );
  })

  test('convertHandler should correctly convert km to mi.', () => {
    const [initNum, initUnit] = [66, 'km'];
    expect(convertHandler.convert(initNum, initUnit)).to.equal(
      convert(initNum, initUnit)
    );
  })

  test('convertHandler should correctly convert lbs to kg.', () => {
    const [initNum, initUnit] = [3.4, 'lbs'];
    expect(convertHandler.convert(initNum, initUnit)).to.equal(
      convert(initNum, initUnit)
    );
  })

  test('convertHandler should correctly convert kg to lbs.', () => {
    const [initNum, initUnit] = [25, 'kg'];
    expect(convertHandler.convert(initNum, initUnit)).to.equal(
      convert(initNum, initUnit)
    );
  })

});
