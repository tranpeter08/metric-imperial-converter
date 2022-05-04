function ConvertHandler() {
  this.units = {
    gal: 'gallon',
    l: 'liter',
    mi: 'mile',
    km: 'kilometer',
    lb: 'pound',
    kg: 'kilogram',
  };

  this.unitConversion = {
    gal: 'l',
    l: 'gal',
    mi: 'km',
    km: 'mi',
    lb: 'kg',
    kg: 'lb',
  };

  this.splitInput = function (input) {
    let sliceIndex = 0;
    const unitRegex = /[a-zA-Z]/gm;

    for (let i = 0; i < input.length; i++) {
      if (unitRegex.test(input[i])) {
        sliceIndex = i;
        break;
      }
    }

    return sliceIndex;
  };

  this.getNum = (input) => {
    let result = 1;
    let sliceIndex = this.splitInput(input);
    let numberInput = input.slice(0, sliceIndex);
    let numbers = numberInput.split('/');

    if (numbers.length > 2)
      throw {
        type: 'NUMBER_ERROR',
        message: 'invalid input number: double fraction',
      };

    if (numbers[0] === '') return result;

    // test if string ends with a period or decimal point
    let decimalRegex = /\.$/;
    let floats = numbers.map((numString) => {
      if (decimalRegex.test(numString))
        throw {
          type: 'NUMBER_ERROR',
          message: 'invalid number: ending with decimal',
        };

      return parseFloat(numString);
    });

    floats.forEach((num) => {
      if (Number.isNaN(num))
        throw {
          type: 'NUMBER_ERROR',
          message: 'invalid number: error parsing string to float',
        };
    });

    result = floats.reduce((prev, current) => {
      return prev / current;
    });

    return result;
  };

  this.getUnit = (input) => {
    let result;
    const sliceIndex = this.splitInput(input);
    const unitInput = input.slice(sliceIndex).toLowerCase();

    if (!this.units[unitInput])
      throw {
        type: 'UNIT_ERROR',
        message: 'Invalid unit: not found ' + unitInput,
      };

    result = unitInput;

    return result;
  };

  this.getReturnUnit = (initUnit) => {
    initUnit = initUnit.toLowerCase();
    if (!this.units[initUnit])
      throw {
        type: 'UNIT_ERROR',
        message: 'Invalid unit: not found ' + initUnit,
      };

    const result = this.unitConversion[initUnit.toLowerCase()];

    if (result === 'l') return result.toUpperCase();

    return result;
  };

  this.spellOutUnit = (unit) => {
    unit = unit.toLowerCase();
    if (!this.units[unit])
      throw {
        type: 'UNIT_ERROR',
        message: 'Invalid unit: not found ' + unit,
      };

    return this.units[unit];
  };

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result = undefined;

    const conversionTable = {
      gal: initNum * galToL,
      l: initNum / galToL,
      lb: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      mi: initNum * miToKm,
      km: initNum / miToKm,
    };

    result = conversionTable[initUnit.toLowerCase()];

    if (typeof result === 'undefined')
      throw {
        type: 'UNIT_ERROR',
        message: 'Invalid unit: not found ' + initUnit,
      };

    return result;
  };

  this.pluralize = function (num) {
    if (num !== 1) return 's';

    return '';
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    let result = `${initNum} ${this.spellOutUnit(initUnit)}s converts to ${returnNum} ${this.spellOutUnit(
      returnUnit
    )}s`;

    return result;
  };
}

module.exports = ConvertHandler;
