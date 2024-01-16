import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const getContainerId = () => {
  const podName = process.env.HOSTNAME || process.env.HOST || null;
  const namespace = process.env.NAMESPACE || process.env.NS || null;

  return podName && namespace ? `${namespace}/${podName}` : null;
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

  //         <p>Container ID: {containerId}</p>
  // <h3>Environment Variables:</h3>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Pick and Pack</p>

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
