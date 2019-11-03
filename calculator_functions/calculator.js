// 'Add' operator that returns final output
// By default, the add operator will not have any constraints for the numbers.
export function add(stringInput, maxConstraintOn = false) {
  const arrayInput = convertToArray(stringInput, maxConstraintOn);

  const sum = arrayInput.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  
  return sum;
}

// Helper: Convert string input to an array with only the appropriate numbers.
function convertToArray(stringInput, maxConstraintOn) {
  const arrayInput = [];
  
  stringInput.split(',').forEach(element => {
    const number = parseInt(element, 10);
    if (!isNaN(number)) {
      arrayInput.push(number);
    } 
  });
  
  if(maxConstraintOn) {
    return validateArray(arrayInput);
  }

  return arrayInput;
} 

// Helper: Validator that throws error if more than two numbers.
function validateArray(arrayInput) {
  if(arrayInput.length > 2) {
    throw new Error('Too many numbers. Should be 2 numbers only!');
  }
  return arrayInput; 
}