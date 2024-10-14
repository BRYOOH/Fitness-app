import React, { Component } from 'react';
import {BrowserRouter }from "react-router-dom"
import Authentication from './Components/Authentication';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Authentication/>
      </BrowserRouter>
    
    );
  }
}

export default App;
