import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const getContainerId = () => {
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const content = fs.readFileSync('/proc/self/cgroup', 'utf8');
      const match = /\/docker\/([a-f0-9]{64})/i.exec(content);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error getting container ID:', error.message);
      return null;
    }
  }
  return null;
};

const getEnvironmentVariables = () => {
  const variables = {};

  // Iterate through all environment variables
  for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      variables[key] = process.env[key];
    }
  }

  return variables;
};

function App() {
  const [containerId, setContainerId] = useState(null);
  const [envVariables, setEnvVariables] = useState(getEnvironmentVariables());

  useEffect(() => {
    const fetchContainerId = () => {
      const id = getContainerId();
      setContainerId(id);
    };

    const fetchEnvironmentVariables = () => {
      const variables = getEnvironmentVariables();
      setEnvVariables(variables);
    };

    fetchContainerId();
    fetchEnvironmentVariables();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Pick and Pack</p>
        <p>Container ID: {containerId}</p>
        <h3>Environment Variables:</h3>
        <ul>
          {Object.entries(envVariables).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
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
