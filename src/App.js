import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './Map'
import Search from './Search'
import './App.css';

// Saint Petersburg: { lat: 59.95, lng: 30.33 }

class App extends Component {
  render() {
    return (
      <div className="app-format">
        <Search />
        <Map center={{ lat: 33.888928, lng: -118.393534 }} zoom={15}/>
      </div>
    );
  }
  // <div className="App">
  // <header className="App-header">
  // <img src={logo} className="App-logo" alt="logo" />
  // <h1 className="App-title">Welcome to React</h1>
  // </header>
  // <p className="App-intro">
  // To get started, edit <code>src/App.js</code> and save to reload.
  // </p>
  // </div>
}

export default App;
