import { lengthOfArray } from '../../functions';
// import { exportAllDeclaration } from '@babel/types';

describe('Mocha Testing', () => {
  it('array length should be zero for empty array', () => {
    const givenArray = [];
    expect(lengthOfArray(givenArray)).to.equal(0);
  });

  it('should return length for given array', () => {
    const givenArray = [1, 2, 3, 4];
    expect(lengthOfArray(givenArray)).to.equal(4);    
  });
});