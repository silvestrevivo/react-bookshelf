import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios
      .get('http://localhost:3000/api/getbooks')
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>This is the basic septup</h1>
      </div>
    );
  }
}

export default hot(module)(App);
