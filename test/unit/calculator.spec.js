import { add, subtract, multiply, divide } from '../../calculator_functions/calculator';
import { displayFormula } from '../../calculator_functions/bonus';

describe('Step #1: Comma delimiter for a maximum of 2 numbers', () => {
  const switchConfigSample = {
    maxConstraintOn: true
  };
  
  it('should return sum of given two numbers between a comma', () => {
    const sampleOne = '1,500';
    const sampleTwo = '4,-3';

    expect(add(sampleOne, switchConfigSample)).to.equal(501);
    expect(add(sampleTwo, switchConfigSample)).to.equal(1);
  });

  it('should convert empty or missing inputs to zero', () => {
    const sampleOne = '';
    const sampleTwo = '20';

    expect(add(sampleOne, switchConfigSample)).to.equal(0);
    expect(add(sampleTwo, switchConfigSample)).to.equal(20);
  });

  it('should convert invalid inputs to zero', () => {
    const sampleOne = 'akldjf';
    const sampleTwo = '5,tytytt';

    expect(add(sampleOne, switchConfigSample)).to.equal(0);
    expect(add(sampleTwo, switchConfigSample)).to.equal(5);
  });

  it('should throw an exception error if more than 2 numbers are given', () => {
    const errorMessage = 'Too many numbers. Should be 2 numbers only!';
    const sampleOne = '1,2,3,4,5,6,7,8,9,10,11,12';
    const sampleTwo = '1,adklfj,100';

    expect(() => add(sampleOne, switchConfigSample)).to.throw(errorMessage);
    expect(add(sampleTwo, switchConfigSample)).to.equal(101);
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

describe('Step #3: Newline delimiter', () => {

  it('should return sum of given numbers', () => {
    const sampleOne = '1\n2,3';
    const sampleTwo = '\n100';

    expect(add(sampleOne)).to.equal(6);
    expect(add(sampleTwo)).to.equal(100);
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
    const sampleThree = 'alkdsjf\n,34\n,1\n';

    expect(add(sampleOne)).to.equal(0);
    expect(add(sampleTwo)).to.equal(11);
    expect(add(sampleThree)).to.equal(35);
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

describe('Step #6: Custom delimiter of a single character', () => {

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

describe('Step #7: Custom delimiter of any character length', () => {

  it('should return sum using the custom delimiter: //{delimiter}\\n{numbers}', () => {
    const sampleOne = '//[***]\n11***22***33';

    expect(add(sampleOne)).to.equal(66);
  });

  it('should return sum supporting previous delimiters if not a custom delimiter', () => {
    const sampleOne = '#\n2,5';
    const sampleTwo = ',\n2,ff,10';
    
    expect(add(sampleOne)).to.equal(7);
    expect(add(sampleTwo)).to.equal(12);
  });
});

describe('Step #8: Multiple custom delimiter of any length', () => {

  it('should return sum using the custom delimiter: //[{delimiter1}][{delimiter2}]...\\n{numbers}', () => {
    const sampleOne = '//[*][!!][r9r]\n11r9r22*hh*33!!44';

    expect(add(sampleOne)).to.equal(110);
  });

  it('should return sum supporting previous delimiters if not a custom delimiter', () => {
    const sampleOne = '#\n2,5';
    const sampleTwo = ',\n2,ff,10';
    
    expect(add(sampleOne)).to.equal(7);
    expect(add(sampleTwo)).to.equal(12);
  });
});

describe('Stretch Goals #1: Display formula', () => {

  it('should return formula used for calculation', () => {
    const sampleOne = '//[*][!!][r9r]\n11r9r22**hh*33!!44';
    const sampleTwo = '2,,4,rrrr,1001,6';
    
    expect(displayFormula(sampleOne)).to.equal('11+22+0+0+33+44=110');
    expect(displayFormula(sampleTwo)).to.equal('2+0+4+0+0+6=12');
  });
});

describe('Stretch Goals #2: Allow the acceptance of arguments that defines alternate delimiter, toggle negative num availability, and upper bound', () => {

  it('should allow alternate delimiter if not passed as argument or switched on', () => {       
    const sampleOne = '1\n2,3';
    const sampleTwo = '2,,\n4,rrrr,1001,6';

    expect(add(sampleOne)).to.equal(6);
    expect(displayFormula(sampleOne)).to.equal('1+2+3=6');
    expect(add(sampleTwo)).to.equal(12);
    expect(displayFormula(sampleTwo)).to.equal('2+0+0+4+0+0+6=12');
  });

  it('should not allow alternate delimiter and line break if accepted as argument or switched off ', () => {   
    const switchConfigSample = {
      alternateDelimiterOn: false  
    };

    const sampleOne = '\n3';
    const sampleTwo = '2,,\n3';

    expect(add(sampleOne, switchConfigSample)).to.equal(3);
    expect(displayFormula(sampleOne, switchConfigSample)).to.equal('\n3=3');
    expect(add(sampleTwo, switchConfigSample)).to.equal(5);
    expect(displayFormula(sampleTwo, switchConfigSample)).to.equal('2+0+\n3=5');
  });

  it('should allow negative numbers if accepted as argument', () => {   
    const switchConfigSample = {
      negativeDenialOn: false
    };
    
    const sampleOne = '1\n-2,-3';

    expect(add(sampleOne, switchConfigSample)).to.equal(-4);
    expect(displayFormula(sampleOne, switchConfigSample)).to.equal('1+(-2)+(-3)=-4');
  });

  it('should not have any upper bound constraints if accepted as argument', () => {   
    const switchConfigSample = {
      upperBoundOn: false  
    };
    
    const sampleOne = '2,1001';
    const sampleTwo = '1001\n1000,2000';

    expect(add(sampleOne, switchConfigSample)).to.equal(1003);
    expect(displayFormula(sampleOne, switchConfigSample)).to.equal('2+1001=1003');
    expect(add(sampleOne)).to.equal(2);
    expect(displayFormula(sampleOne)).to.equal('2+0=2');
    expect(add(sampleTwo, switchConfigSample)).to.equal(4001);
    expect(displayFormula(sampleTwo, switchConfigSample)).to.equal('1001+1000+2000=4001');
  });
});

describe('Stretch Goals #3: Support subtraction, multiplication, and division operations', () => {
  const sampleOne = '//#\n5#2';
  const sampleTwo = ',\n10,ff,2';
  const sampleThree = '//[***]\n33***3***11';
  const sampleFour = '//[*][!!][r9r]\n100r9r20*hh*5!!0';
  
  it('should return value using the subtraction operation', () => {
    const switchConfigSample = {
      operator: '-'  
    };
    
    expect(subtract(sampleOne)).to.equal(3);
    expect(displayFormula(sampleOne, switchConfigSample)).to.equal('5-2=3');
    expect(subtract(sampleTwo)).to.equal(-12);
    expect(displayFormula(sampleTwo, switchConfigSample)).to.equal('0-0-10-0-2=-12');
    expect(subtract(sampleThree)).to.equal(19);
    expect(displayFormula(sampleThree, switchConfigSample)).to.equal('33-3-11=19');
    expect(subtract(sampleFour)).to.equal(75);
    expect(displayFormula(sampleFour, switchConfigSample)).to.equal('100-20-0-5-0=75');
  });

  it('should return value using the multiplication operation', () => {
    const switchConfigSample = {
      operator: '*'  
    };

    expect(multiply(sampleOne)).to.equal(10);
    expect(displayFormula(sampleOne, switchConfigSample)).to.equal('5*2=10');
    expect(multiply(sampleTwo)).to.equal(0);
    expect(displayFormula(sampleTwo, switchConfigSample)).to.equal('0*0*10*0*2=0');
    expect(multiply(sampleThree)).to.equal(1089);
    expect(displayFormula(sampleThree, switchConfigSample)).to.equal('33*3*11=1089');
    expect(multiply(sampleFour)).to.equal(0);
    expect(displayFormula(sampleFour, switchConfigSample)).to.equal('100*20*0*5*0=0');
  });

  it('should return value using the multiplication operation', () => {
    const switchConfigSample = {
      operator: '/'  
    };

    expect(divide(sampleOne)).to.equal(2.5);
    expect(displayFormula(sampleOne, switchConfigSample)).to.equal('5/2=2.5');
    expect(divide(sampleTwo)).to.be.NaN;
    expect(displayFormula(sampleTwo, switchConfigSample)).to.equal('0/0/10/0/2=NaN');
    expect(divide(sampleThree)).to.equal(1);
    expect(displayFormula(sampleThree, switchConfigSample)).to.equal('33/3/11=1');
    expect(divide(sampleFour)).to.equal(Infinity);
    expect(displayFormula(sampleFour, switchConfigSample)).to.equal('100/20/0/5/0=Infinity');
  });
});