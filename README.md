This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Welcome to my "Delimiter Calculator!"

### This calculator meets the following criteria:
- Comma delimiter calculation (add, subtract, multiply, divide)
- Alternative delimiter calculation (New line)
- Allowing/Denying Negative numbers for calculation
- Upper bound constraint setting calculation (max 1000)

- Supports custom delimiters too. Try using below formats:
  - Single character format: //{delimiter}\n{numbers}
    - Ex) `//#\n2#5` will return 7 
  - Any length single character format: //[{delimiter}]\n{numbers}
    - Ex) `//[***]\n11***22***33` will return 66
  - Multiple character delimiters format: //[{delimiter1}][{delimiter2}]...\n{numbers}
    - Ex) `//[*][!!][r9r]\n11r9r22*hh*33!!44` will return 110
  
To see the mini app calculator, you can run the below code in your project directory:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can also run unit test. (Uses Mocha, Chai)
### `npm run test`