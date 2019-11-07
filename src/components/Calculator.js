import React, { Component } from 'react';
import ConstraintsPad from './ConstraintsPad';
import { 
  Container,
  Input
 } from 'semantic-ui-react';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      stringInput: "",
      switchConfig: {
        alternateDelimiterOn: true,
        negativeDenialOn: true,
        upperBoundOn: true,
        maxConstraintOn: false
      }
    }
  }

  handleChange = async (event) => {
    if(event.target.value.includes('\n')) {
      
    }
    await this.setState({
      stringInput: event.target.value
    })
  }

  render() {

    let { stringInput, switchConfig } = this.state;

    return (
      <Container>
        
        <p>Type in a number such as:</p>

        <Input focus  
          type="text" 
          placeholder={"e.g) 5,tytyt,2 "}
          value={this.state.text}
          onChange={this.handleChange}
        />
        
        <br></br>

        <ConstraintsPad stringInput={stringInput} switchConfig={switchConfig}/>
        
      </Container>
    )
  }
  
}

export default Calculator;