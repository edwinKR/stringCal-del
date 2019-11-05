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

    let regexInput; 
    if(isSingleCharacter(parsedSet)) {
      regexInput = "[" + parsedSet[1] + "]"; 
    } else {
      // Obtaining the right regex format for customed delimiters.
      regexInput = getRegexForCustomDelimiters(parsedSet[1]);
    }
    delimiters = new RegExp(regexInput);
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

// Helper: Check if custom delimiter is a single character.
function isSingleCharacter(parsedSet) {
  return parsedSet[1].indexOf(0) === "[" && parsedSet[1].indexOf(parsedSet[1].length - 1) === "]"
}

// Helper: Get proper format for the customed delimiters given.
function getRegexForCustomDelimiters(delimitersToParse) {
  return delimitersToParse.replace(/\]\[/g, "]|[");
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