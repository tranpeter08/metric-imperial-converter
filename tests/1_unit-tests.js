const chai = require('chai');
let assert = chai.assert;
const { expect } = chai;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input.', () => {
    assert.equal(convertHandler.getNum('3km'), 3);
    assert.equal(convertHandler.getNum('8gal'), 8);
  })

  test('convertHandler should correctly read a decimal number input', () => {
    assert.equal(convertHandler.getNum('5.2km'), 5.2);
    assert.equal(convertHandler.getNum('1.002km'), 1.002);
  })

  test('convertHandler should correctly read a fractional input.', () => {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
    assert.equal(convertHandler.getNum('1/4l'), 0.25);
  })

  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    assert.equal(convertHandler.getNum('1.8/3.6km'), 0.5);
    assert.equal(convertHandler.getNum('.06/.24l'), 0.25);
  })

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
    assert.equal(convertHandler.getNum('1/2/3km'), 'INVALID_NUMBER');
  })

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    assert.equal(convertHandler.getNum('km'), 1);
  })

  test('convertHandler should correctly read each valid input unit.', () => {
    assert.equal(convertHandler.getUnit('100mi'), 'mi');
    assert.equal(convertHandler.getUnit('19km'), 'km');
    assert.equal(convertHandler.getUnit('9.7l'), 'L');
    assert.equal(convertHandler.getUnit('1/4gal'), 'gal');
  })

  test('convertHandler should correctly return an error for an invalid input unit.', () => {
    assert.equal(convertHandler.getUnit('1/4lb'), 'INVALID_UNIT');
  })

  test('convertHandler should return the correct return unit for each valid input unit.', () => {
    const unitConversion = [
      ['km', 'mi'],
      ['mi', 'km'],
      ['l', 'gal'],
      ['gal', 'L'],
      ['lbs', 'kg'],
      ['kg', 'lbs']
    ];

    unitConversion.forEach((conversion) => {
      assert.equal(convertHandler.getReturnUnit(conversion[0]), conversion[1]);
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
      assert.equal(convertHandler.spellOutUnit(unit), unitString);
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

    assert.equal(convertHandler.convert(initNum, initUnit), convert(initNum, initUnit));
  })

  test('convertHandler should correctly convert L to gal', () => {
    const [initNum, initUnit] = [23, 'l'];
    assert.equal(convertHandler.convert(initNum, initUnit), convert(initNum, initUnit));
  })

  test('convertHandler should correctly convert mi to km.', () => {
    const [initNum, initUnit] = [78, 'mi'];
    assert.equal(convertHandler.convert(initNum, initUnit), convert(initNum, initUnit));
  })

  test('convertHandler should correctly convert km to mi.', () => {
    const [initNum, initUnit] = [66, 'km'];
    assert.equal(convertHandler.convert(initNum, initUnit), convert(initNum, initUnit));
  })

  test('convertHandler should correctly convert lbs to kg.', () => {
    const [initNum, initUnit] = [3.4, 'lbs'];
   assert.equal(convertHandler.convert(initNum, initUnit), convert(initNum, initUnit));
  })

  test('convertHandler should correctly convert kg to lbs.', () => {
    const [initNum, initUnit] = [25, 'kg'];
   assert.equal(convertHandler.convert(initNum, initUnit), convert(initNum, initUnit));
  })

});
