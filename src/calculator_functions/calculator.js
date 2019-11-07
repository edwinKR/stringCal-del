import { getStateOfSwitchConfig } from './switch_config_state';

//  For default conditions(i.e. upper bounds, alternate delimiter, etc.), check the 'switch_config_state.js'

// 'Add' operator that returns the final output.
export function add(stringInput, switchConfig) {
  //Need to start with initial state of our switch configs.
  switchConfig = getStateOfSwitchConfig(switchConfig);
  
  const arrayInput = convertToArray(stringInput, switchConfig);
  const sum = arrayInput.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  
  return sum;
}

// 'Subtract' operator.
export function subtract(stringInput, switchConfig) {
  //Need to start with initial state of our switch configs.
  switchConfig = getStateOfSwitchConfig(switchConfig);
  
  const arrayInput = convertToArray(stringInput, switchConfig);
  const calculation = arrayInput.reduce((acc, curr) => {
    return acc - curr;
  });
  
  return calculation;
}

// 'Multiply' operator.
export function multiply(stringInput, switchConfig) {
  //Need to start with initial state of our switch configs.
  switchConfig = getStateOfSwitchConfig(switchConfig);
  
  const arrayInput = convertToArray(stringInput, switchConfig);
  const calculation = arrayInput.reduce((acc, curr) => {
    return acc * curr;
  });
  
  return calculation;
}

// 'Divide' operator.
export function divide(stringInput, switchConfig) {
  //Need to start with initial state of our switch configs.
  switchConfig = getStateOfSwitchConfig(switchConfig);
  
  const arrayInput = convertToArray(stringInput, switchConfig);

  const calculation = arrayInput.reduce((acc, curr) => {
    return acc / curr;
  });
  
  return calculation;
}

// Helper: Convert string input to an array with only the appropriate numbers.
function convertToArray(stringInput, switchConfig) {
  const delimiterAndNumbers = getSetOfDelimitersAndNumbersToCalculate(stringInput, switchConfig);
  const delimiters = delimiterAndNumbers[0];
  stringInput = delimiterAndNumbers[1];

  const arrayInput = [];
  stringInput.split(delimiters).forEach(element => {
    let number = parseInt(element, 10);

    if(switchConfig.upperBoundOn && number > 1000) {
      number = 0;
    }

    if(isNaN(number)) {
      number = 0;
    }

    if(!isNaN(number) || number === 0) {
      arrayInput.push(number);
    } 
  });

  if(switchConfig.maxConstraintOn) {
    return validateArray(arrayInput); 
  }

  return switchConfig.negativeDenialOn ? checkNegatives(arrayInput) : arrayInput; 
} 

// Helper: Provide set of custom delimiter & the parsed numbers to calculate.
// Output format is [delimiter, numbers to add] | Example: ['#', '2#5'] 
function getSetOfDelimitersAndNumbersToCalculate(stringInput, switchConfig) {
  const givenCustomRegex  = /\/\/(.*)\n/;
  let delimiters = /[,\n]/;

  // Obtaining the delimiter to be used whether it is the given default(,/n) or customed version.
  if(isCustomDelimiter(givenCustomRegex, stringInput)) {
    const parsedSet = stringInput.split(givenCustomRegex);
    
    let regexInput; 
    if(parsedSet[1].length === 1) {
      regexInput = parsedSet[1];
    } else if(isSingleCharacter(parsedSet)) {
      regexInput = "[" + parsedSet[1] + "]"; 
    } else {
      // Obtaining the right regex format for customed delimiters.
      if(/\]\[/.test(parsedSet[1]) === false) {
        const customDelimiter = parsedSet[1].slice(1, parsedSet[1].length - 1)
        regexInput = `\\${customDelimiter.split("").join('\\')}`;
      } else {
        regexInput = getRegexForCustomDelimiters(parsedSet[1]);
      }
    }

    delimiters = new RegExp(regexInput);
    stringInput = parsedSet[2];

  } else if(!switchConfig.alternateDelimiterOn) {
    delimiters = /[,]/;
  }

  return [delimiters, stringInput];
}


// Helper: Check if given stringInput is a custom delimiter.
export function isCustomDelimiter(regex, stringInput) {
  return stringInput.indexOf("//") === 0 && regex.test(stringInput)
}

// Helper: Check if custom delimiter is a single character.
function isSingleCharacter(parsedSet) {
  return parsedSet[1].indexOf(0) === "[" && parsedSet[1].indexOf(parsedSet[1].length - 1) === "]"
}

// Helper: Get proper format for the customed delimiters given.
function getRegexForCustomDelimiters(delimitersToParse) {
  return delimitersToParse = delimitersToParse.replace(/\]\[/g, "]|[");
}

// Helper: Throw error if more than 2 numbers in input. Otherwise, return proper array. 
function validateArray(arrayInput) {
  const testArray = arrayInput.filter(num => num !== 0);
  if(testArray.length > 2) {
    throw new Error("Too many numbers. Should be 2 numbers only!");
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

