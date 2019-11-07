import React, { Component } from 'react';
import { displayFormula } from '../calculator_functions/bonus';
import { 
  Button,
  Message,
  Container
 } from 'semantic-ui-react'

class OperatorPad extends Component {
  constructor() {
    super();
    this.state = {
      finalOutput: "",
      switchConfig: {
        operator: '+'
      },
    }
  }

  handleClick = async (event) => {
    await this.setState({ 
      switchConfig: { ...this.state.switchConfig, operator: event.target.name, ...this.props.switchConfigState }
    });

    this.printFinalOutput();
  }

  printFinalOutput = async () => {
    let output;
    try {
      output = await displayFormula(this.props.stringInput, this.state.switchConfig);
    } catch(err) {
      output = err.message;
    }

    this.setState({
      finalOutput: output,
    });
  }


  render() {
    let { finalOutput } = this.state;

    return (
      <Container textAlign="center">
        <br></br>
        <Button color='green' name="+" onClick={this.handleClick} >+</Button>
        <Button color='green' name="-" onClick={this.handleClick} >-</Button>
        <Button color='green' name="*" onClick={this.handleClick} >x</Button>
        <Button color='green' name="/" onClick={this.handleClick} >÷</Button>
        <br></br>

        <p>Your calculation: <Message>{finalOutput}</Message> </p>

      </Container>
    );
  }
}

export default OperatorPad;