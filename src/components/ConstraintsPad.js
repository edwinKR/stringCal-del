import React, { Component } from 'react';
import OperatorPad from './OperatorPad';
import { 
  Grid,
  Container,
 } from 'semantic-ui-react'

class ConstraintsPad extends Component {
  constructor() {
    super();
    this.state = {
      stringInput: "",
      switchConfigState: {
        alternateDelimiterOn: true,
        negativeDenialOn: true,
        upperBoundOn: true,
        maxConstraintOn: false
      }
    }
  }

  handleChange = async (event) => {
    await this.setState({
      switchConfigState: { 
        ...this.state.switchConfigState, 
        [event.target.name]: !this.state.switchConfigState[event.target.name]
      } 
    })
  }

  render() {
    let { stringInput } = this.props;
    let { alternateDelimiterOn, negativeDenialOn, upperBoundOn, maxConstraintOn } = this.state.switchConfigState;
    return (
      <Container>
        <br></br>

        <Grid columns='equal'>
          <Grid.Column>
            <input type="checkbox" name="alternateDelimiterOn" checked={alternateDelimiterOn} onChange={this.handleChange} /> Alternate Delimiter(\n)  
          </Grid.Column>
          <br></br>
          <Grid.Column>
            <input type="checkbox" name="negativeDenialOn" checked={negativeDenialOn} onChange={this.handleChange} /> Don't Allow Negatives
          </Grid.Column>
          <br></br>
          <Grid.Column>
            <input type="checkbox" name="upperBoundOn" checked={upperBoundOn} onChange={this.handleChange} /> Constraint Max 1000
          </Grid.Column>
          <br></br>
          <Grid.Column>
            <input type="checkbox" name="maxConstraintOn" checked={maxConstraintOn} onChange={this.handleChange} /> Allow Only 2 Numbers       
          </Grid.Column>
        </Grid>

        <br></br>
        
        <OperatorPad stringInput={stringInput} switchConfigState={this.state.switchConfigState} />
      </Container>
    );
  }
}

export default ConstraintsPad;