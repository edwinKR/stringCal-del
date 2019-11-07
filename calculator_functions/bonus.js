// Comment: Helper methods below here maybe redundant. I wanted to play around with regex a bit more which is why I created another file here. 
import { add, subtract, multiply, divide, isCustomDelimiter } from './calculator';
import { getStateOfSwitchConfig } from './switch_config_state';

export function displayFormula(stringInput, switchConfig) {
  //Need to start with initial state of our switch configs.
  switchConfig = getStateOfSwitchConfig(switchConfig);

  const setOfDelimitersAndNumsToCalculate = getSetOfDelimitersAndNumsToCalculate(stringInput, switchConfig);
  const [ regexFormattedDelimiters, numsToCalculate ] = setOfDelimitersAndNumsToCalculate;
 
  const outputFormula = displayCalculatations(numsToCalculate, regexFormattedDelimiters, switchConfig);
  const outputTotal = displayTotalValue(stringInput, switchConfig);
  return `${outputFormula}=${outputTotal}`;
}

// Helper: Depending on type of delimiter, provide set of custom delimiter & the parsed numbers to sum up.
// Output format is [delimiters, numbers to calculate] | Example: ['#', '2#5'] 
function getSetOfDelimitersAndNumsToCalculate(stringInput, switchConfig) {
  let numsToCalculate;
  let regexFormattedDelimiters;

  let givenCustomRegex = /\/\/(.*)/;
  if(isCustomDelimiter(givenCustomRegex, stringInput)) {
    if((/\[(.*?)\]/).test(stringInput)) {
      givenCustomRegex = /\[(.*?)\]/g;
    } 
    
    let delimitersAndNumbers = stringInput.split(givenCustomRegex); 
    let delimiters = formatCustomDelimitersForRegexReady(delimitersAndNumbers);
    regexFormattedDelimiters = new RegExp(delimiters);

    numsToCalculate = delimitersAndNumbers[delimitersAndNumbers.length - 1]
      .slice(1)
      .split(regexFormattedDelimiters)
      .filter(num => num !== undefined);
  } else if(!switchConfig.alternateDelimiterOn) {
    regexFormattedDelimiters = /[,]/;
    numsToCalculate = stringInput.split(regexFormattedDelimiters);
  } else {
    regexFormattedDelimiters = /[,\n]/;
    numsToCalculate = stringInput.split(regexFormattedDelimiters);
  }

  return [regexFormattedDelimiters, numsToCalculate];
}

// Helper: Formatting given custom delimiter into a format to use as regex.
function formatCustomDelimitersForRegexReady(delimitersAndNumbers) {
  const delimiters = delimitersAndNumbers
    .slice(1, delimitersAndNumbers.length - 1)
    .filter(del => del !== "")
    .map(del => {
      const backslashLiterals =  "[\^$.|?*+(){}";
      if(backslashLiterals.includes(del[0])) {
        if(del.length > 1) {
          return `\\${del.split("").join('\\')}`;
        } else {
          return `(\\${del})`;
        }
      } else {
        return `(${del})`;
      }
    });

    if(delimiters.length === 1 && delimiters[0][0] === '(' && delimiters[0][2] === ')') {
      // If single custom delimiter, grab only the single delimiter character.
      return `${delimiters[0][1]}`; 
    } else  {
      // Else, multi delimiter or a single delimiter with multi characters.
      return delimiters.join("|");
    }
}

// Helper: Return final total value depending on the operator function to use for our calculations.
function displayTotalValue(stringInput, switchConfig) {
  const whichOperator = {
    '+': add,
    '-': subtract,
    "*": multiply,
    "/": divide
  };
  
  return whichOperator[switchConfig.operator](stringInput, switchConfig);
}

// Helper: Return final formula used depending on the operator.
function displayCalculatations(numsToCalculate, regexFormattedDelimiters, switchConfig) {
  return numsToCalculate
    .map(num => {
      if(regexFormattedDelimiters.test(num)) {
        num = '~';
      } else if(switchConfig.upperBoundOn && parseInt(num, 10) > 1000) {
        num = 0;
      } else if(isNaN(parseInt(num, 10))) {
        num = 0;
      }
      return isNegatvie(num) ? `(${num})` : num;
    })
    .filter(num => num !== '~')
    .join(`${switchConfig.operator}`);
}


// Helper: Simple boolean check to see if number is negative.
function isNegatvie(num) {
  return parseInt(num, 10) < 0;
}