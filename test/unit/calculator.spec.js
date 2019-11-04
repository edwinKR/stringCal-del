import { add } from '../../calculator_functions/calculator';

xdescribe('Step #1: Comma delimiter for a maximum of 2 numbers', () => {
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

xdescribe('Step #2: Comma delimiter without maximum constraint', () => {

  it('should return sum of given numbers', () => {
    const sampleOne = '1,2,3,4,5,6,7,8,9,10,11,12';
    const sampleTwo = '1,adklfj,100,-,/,200';

    expect(add(sampleOne)).to.equal(78);
    expect(add(sampleTwo)).to.equal(301);
  });


});

xdescribe('Step #3: Newline delimiter', () => {

  it('should return sum of given numbers', () => {
    const sampleOne = '1\n2,3';
    const sampleTwo = '-1\n100';

    expect(add(sampleOne)).to.equal(6);
    expect(add(sampleTwo)).to.equal(99);
  });

  it('should return zero if nothing but only new line and/or comma delimiters provided', () => {
    const sampleOne = ',';
    const sampleTwo = '\n';
    const sampleThree = '\n,\n,\n';

    expect(add(sampleOne)).to.equal(0);
    expect(add(sampleTwo)).to.equal(0);
    expect(add(sampleThree)).to.equal(0);
  });

  it('should return sum of purely numbers', () => {
    const sampleOne = ',\n';
    const sampleTwo = '\n11';
    const sampleThree = 'alkdsjf\n,34\n,-1\n';

    expect(add(sampleOne)).to.equal(0);
    expect(add(sampleTwo)).to.equal(11);
    expect(add(sampleThree)).to.equal(33);
  });
});

describe('Step #4: Deny any negative numbers', () => {

  it('should throw an exception error with all negative numbers provided', () => {
    const sampleOne = '1\n-2,-3';
    const errorOutputOne = "Found negative nums: [-2,-3]";

    const sampleTwo = '-1,aldfja\n100';
    const errorOutputTwo = "Found negative nums: [-1]";
    
    expect(() => add(sampleOne)).to.throw(errorOutputOne);
    expect(() => add(sampleTwo)).to.throw(errorOutputTwo);
  });

  it('should not throw an exception error with just the negative sign', () => {
    const sampleOne = '-';
    const errorOutputOne = "Found negative nums: [-]";

    const sampleTwo = '-,aldfja\n100';
    const errorOutputTwo = "Found negative nums: [-]";
    
    const sampleThree = '-,1\n-,';
    const errorOutputThree = "Found negative nums: [-]";

    expect(() => add(sampleOne)).to.not.throw(errorOutputOne);
    expect(add(sampleOne)).to.equal(0);
    expect(() => add(sampleTwo)).to.not.throw(errorOutputTwo);
    expect(add(sampleTwo)).to.equal(100);
    expect(() => add(sampleThree)).to.not.throw(errorOutputThree);
    expect(add(sampleThree)).to.equal(1);
  });
});

describe('Step #5: Number must not be greater than 1000', () => {

  it('should return sum excluding numbers greater than 1000', () => {
    const sampleOne = '2,1001,6';
    const sampleTwo = ',aldfja\n2019';
    const sampleThree = '1000\n1000,1000';
    expect(add(sampleOne)).to.equal(8);
    expect(add(sampleTwo)).to.equal(0);
    expect(add(sampleThree)).to.equal(3000);
  });
});

describe.only('Step #6: Customer delimiter of a single character', () => {

  it('should return sum using the custom delimiter: //{delimiter}\\n{numbers}', () => {
    const sampleOne = '//#\n2#5';
    const sampleTwo = '//,\n2,ff,100';

    expect(add(sampleOne)).to.equal(7);
    expect(add(sampleTwo)).to.equal(102);
  });

  it('should return sum supporting previous delimiters if not a custom delimiter', () => {
    const sampleOne = '#\n2,5';
    const sampleTwo = ',\n2,ff,10';
    
    expect(add(sampleOne)).to.equal(7);
    expect(add(sampleTwo)).to.equal(12);
  });
});