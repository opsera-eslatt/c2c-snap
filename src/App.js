import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Get all environment variables
  const environmentVariables = Object.keys(process.env).map(key => (
    <p key={key}>{`${key}: ${process.env[key]}`}</p>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Pick and Pack</p>
        {environmentVariables}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fulfillment - Code to Cloud - Snap
        </a>
      </header>
    </div>
  );
}

export default App;
