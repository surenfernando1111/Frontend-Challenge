import React, { Component } from 'react';
import Weather from './components/Weather';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Weather></Weather>
      </div>
    );
  }
}

export default App;