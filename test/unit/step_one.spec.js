import { add } from '../../calculator_functions/step_one';

describe('Step #1: Comma delimiter', () => {
  it('should return sum of given two numbers between a comma', () => {
    const sampleOne = '1,5000';
    const sampleTwo = '4,-3';

    expect(add(sampleOne)).to.equal(5001);
    expect(add(sampleTwo)).to.equal(1);
  });

  it('should convert empty or missing inputs to zero', () => {
    const sampleOne = '';
    const sampleTwo = '20';

    expect(add(sampleOne)).to.equal(0);
    expect(add(sampleTwo)).to.equal(20);
  });

  it('should convert invalid inputs to zero', () => {
    const sampleOne = 'akldjf';
    const sampleTwo = '5,tytytt';

    expect(add(sampleOne)).to.equal(0);
    expect(add(sampleTwo)).to.equal(5);
  });

  it('should throw an exception error if more than 2 numbers are given', () => {
    const errorMessage = 'Too many numbers. Should be 2 numbers only!';
    const sampleOne = '1,2,3,4,5,6,7,8,9,10,11,12';
    const sampleTwo = '1,adklfj,100';

    expect(() => add(sampleOne)).to.throw(errorMessage);
    expect(add(sampleTwo)).to.equal(101);
  });
});