import { add } from '../../calculator_functions/calculator';

describe('Step #1: Comma delimiter for a maximum of 2 numbers', () => {
  const maxConstraintOn = true;
  
  it('should return sum of given two numbers between a comma', () => {
    const sampleOne = '1,5000';
    const sampleTwo = '4,-3';

    expect(add(sampleOne, maxConstraintOn)).to.equal(5001);
    expect(add(sampleTwo, maxConstraintOn)).to.equal(1);
  });

  it('should convert empty or missing inputs to zero', () => {
    const sampleOne = '';
    const sampleTwo = '20';

    expect(add(sampleOne, maxConstraintOn)).to.equal(0);
    expect(add(sampleTwo, maxConstraintOn)).to.equal(20);
  });

  it('should convert invalid inputs to zero', () => {
    const sampleOne = 'akldjf';
    const sampleTwo = '5,tytytt';

    expect(add(sampleOne, maxConstraintOn)).to.equal(0);
    expect(add(sampleTwo, maxConstraintOn)).to.equal(5);
  });

  it('should throw an exception error if more than 2 numbers are given', () => {
    const errorMessage = 'Too many numbers. Should be 2 numbers only!';
    const sampleOne = '1,2,3,4,5,6,7,8,9,10,11,12';
    const sampleTwo = '1,adklfj,100';

    expect(() => add(sampleOne, maxConstraintOn)).to.throw(errorMessage);
    expect(add(sampleTwo, maxConstraintOn)).to.equal(101);
  });
});

describe('Step #2: Comma delimiter without maximum constraint', () => {

  it('should return sum of given numbers', () => {
    const sampleOne = '1,2,3,4,5,6,7,8,9,10,11,12';
    const sampleTwo = '1,adklfj,100,-,/,200';

    expect(add(sampleOne)).to.equal(78);
    expect(add(sampleTwo)).to.equal(301);
  });
});