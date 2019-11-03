// 'Add' operator that returns final output
export function add(stringInput) {
  const arrayInput = convertToArray(stringInput);

  const sum = arrayInput.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  
  return sum;
}

// Helper: Convert string input to an array with only the appropriate numbers.
function convertToArray(stringInput) {
  const arrayInput = [];
  
  stringInput.split(',').forEach(element => {
    const number = parseInt(element, 10);
    if (!isNaN(number)) {
      arrayInput.push(number);
    } 
  });
  
  return validateArray(arrayInput);
} 

// Helper: Validator that throws error if more than two numbers. Otherwise, return the original array.
function validateArray(arrayInput) {
  if(arrayInput.length > 2) {
    throw new Error('Too many numbers. Should be 2 numbers only!');
  } 
  return arrayInput;
}