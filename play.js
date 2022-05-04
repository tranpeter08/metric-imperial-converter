function test(input = '') {
  let result;
  let sliceIndex = 0;

  const unitRegex = /[a-zA-Z]/gm;
  const ERROR_MESSAGE = 'Invalid number input';

  for (let i = 0; i < input.length; i++) {
    if (unitRegex.test(input[i])) {
      sliceIndex = i;
      break;
    }
  }

  console.log(input.slice(0, sliceIndex));

  let numberInput = input.slice(0, sliceIndex);
  let numbers = numberInput.split('/');

  // console.log(numbers);

  if (numbers.length > 2) throw ERROR_MESSAGE;

  // test if string ends with a period or decimal point
  let decimalRegex = /\.$/;
  let floats = numbers.map((numString) => {
    if (decimalRegex.test(numString)) throw ERROR_MESSAGE;
    return parseFloat(numString);
  });

  console.log(floats);

  floats.forEach((num) => {
    if (Number.isNaN(num)) throw ERROR_MESSAGE;
  });

  result = floats.reduce((prev, current) => {
    return prev / current;
  });

  console.log(result);

  return result;
}

// test('6/.5a');

function test2(input) {
  let result;

  return result;
}
