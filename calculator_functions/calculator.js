// 'Add' operator that returns the final output.
//  By default, the add operator will not have any constraints for the numbers.
export function add(stringInput, maxConstraintOn = false) {
  const arrayInput = convertToArray(stringInput, maxConstraintOn);
  const sum = arrayInput.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  
  return sum;
}

// Helper: Convert string input to an array with only the appropriate numbers.
function convertToArray(stringInput, maxConstraintOn) {
  const delimiterAndNumbers = getSetOfDelimitersAndNumbersToSum(stringInput);
  const delimiters = delimiterAndNumbers[0];
  stringInput = delimiterAndNumbers[1];  

  const arrayInput = [];
  stringInput.split(delimiters).forEach(element => {
    const number = parseInt(element, 10);

    if(!isNaN(number) && number <= 1000) {
      arrayInput.push(number);
    } 
  });
  
  if(maxConstraintOn) {
    return validateArray(arrayInput); 
  }

  return checkNegatives(arrayInput); 
} 

// Helper: Provide set of custom delimiter & the parsed numbers to sum up.
// Output format is [delimiter, numbers to add] | Example: ['#', '2#5'] 
function getSetOfDelimitersAndNumbersToSum(stringInput) {
  const givenCustomRegex  = /\/\/(.*)\n/;
  let delimiters;

  // Obtaining the delimiter to be used whether it is the given default(,/n) or customed version.
  if(isCustomDelimiter(givenCustomRegex, stringInput)) {
    const parsedSet = stringInput.split(givenCustomRegex);
    delimiters = new RegExp("[" + parsedSet[1] + "]");
    stringInput = parsedSet[2];
  } else {
    delimiters = /[,\n]/;
  }
  return [delimiters, stringInput];
}

// Helper: Check if given stringInput is a custom delimiter.
function isCustomDelimiter(regex, stringInput) {
  return stringInput.indexOf("//") === 0 && regex.test(stringInput)
}

// Helper: Throw error if more than 2 numbers in input. Otherwise, return proper array. 
function validateArray(arrayInput) {
  if(arrayInput.length > 2) {
    throw new Error('Too many numbers. Should be 2 numbers only!');
  }

  return arrayInput; 
}

// Helper: Throw error if negative number(s) included in input. Otherwise, return proper array.
function checkNegatives(arrayInput) {
  const negativeNums = arrayInput.filter(number => number < 0);
  
  if(negativeNums.length > 0) {
    const errorOutput = `Found negative nums: [${negativeNums}]`
    throw new Error(errorOutput);
  }

  return arrayInput;
}