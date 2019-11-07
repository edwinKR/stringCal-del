import React from 'react';
// import './App.css';
import Calculator from './components/Calculator';
import { 
  Header,
  Grid
 } from 'semantic-ui-react';

class App extends React.Component {

  render() {
    return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign='middle'>
        {/* <Container textAlign="center"> */}
      <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
          Welcome to My Delimiter Calculator!
          </Header>
        <Calculator />
        
        {/* </Container> */}
      </Grid.Column>
    </Grid>
    );
  }
}

export default App;
