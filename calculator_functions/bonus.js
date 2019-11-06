// Comment: Helper methods below here maybe redundant. I wanted to play around with regex a bit more which is why I created another file here. 
import { add, isCustomDelimiter } from './calculator';

export function displayFormula(stringInput) {
  let setOfDelimitersAndNumsToCalculate = getSetOfDelimitersAndNumsToCalculate(stringInput);
  let [regexFormattedDelimiters , numsToCalculate ] = setOfDelimitersAndNumsToCalculate;

  let outputToDisplay = numsToCalculate
    .map(num => {
      if(regexFormattedDelimiters.test(num)) {
        num = '-';
      } else if(isNaN(parseInt(num, 10)) || num > 1000) {
        num = '0';
      } 
      return num;
    })
    .filter(num => num !== '-')
    .join('+');

  return `${outputToDisplay}=${add(stringInput)}`;
}

// Helper: Depending on type of delimiter, provide set of custom delimiter & the parsed numbers to sum up.
// Output format is [delimiters, numbers to calculate] | Example: ['#', '2#5'] 
function getSetOfDelimitersAndNumsToCalculate(stringInput) {
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