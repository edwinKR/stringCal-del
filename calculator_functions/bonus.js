// Comment: Helper methods below here maybe redundant. I wanted to play around with regex a bit more which is why I created another file here. 
import { add, isCustomDelimiter } from './calculator';
import { getStateOfSwitchConfig } from './switch_config_state';

export function displayFormula(stringInput, switchConfig) {
  //Need to start with initial state of our switch configs.
  switchConfig = getStateOfSwitchConfig(switchConfig);

  let setOfDelimitersAndNumsToCalculate = getSetOfDelimitersAndNumsToCalculate(stringInput, switchConfig);
  let [regexFormattedDelimiters , numsToCalculate ] = setOfDelimitersAndNumsToCalculate;
  
  let outputToDisplay = numsToCalculate
    .map(num => {
      if(regexFormattedDelimiters.test(num)) {
        num = '~';
      } else if(switchConfig.upperBoundOn && parseInt(num, 10) > 1000) {
        num = '0';
      } else if(isNaN(parseInt(num, 10))) {
        num = '0';
      }

      return isNegatvie(num) ? `(${num})` : num;
    })
    .filter(num => num !== '~')
    .join('+');

  return `${outputToDisplay}=${add(stringInput, switchConfig)}`;
}

// Helper: Depending on type of delimiter, provide set of custom delimiter & the parsed numbers to sum up.
// Output format is [delimiters, numbers to calculate] | Example: ['#', '2#5'] 
function getSetOfDelimitersAndNumsToCalculate(stringInput, switchConfig) {
  let numsToCalculate;
  let regexFormattedDelimiters;

  if (isCustomDelimiter(/\/\/(.*)\n/, stringInput)) {
    const givenCustomRegex = /\[(.*?)\]/g;
    const delimitersAndNumbers = stringInput.split(givenCustomRegex); 
    const delimiters = formatCustomDelimitersForRegexReady(delimitersAndNumbers);

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
      if(backslashLiterals.includes(del)) {
        return `(\\${del})`;
      } else {
        return `(${del})`;
      }
    });

  return delimiters.join("|");
}

// Helper: Simple boolean check to see if number is negative.
function isNegatvie(num) {
  return parseInt(num, 10) < 0;
}