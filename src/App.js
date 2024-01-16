import React from 'react';
import logo from './logo.svg';
import './App.css';

const getContainerId = () => {
  // Check if 'fs' is available (Node.js environment)
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
  return null; // Returning null if running in the browser
};

function App() {
  // Get all environment variables
  const environmentVariables = Object.keys(process.env).map(key => (
    <p key={key}>{`${key}: ${process.env[key]}`}</p>
  ));

  const [containerId, setContainerId] = useState(null);

  useEffect(() => {
    const fetchContainerId = () => {
      const id = getContainerId();
      setContainerId(id);
    };

    fetchContainerId();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Pick and Pack</p>
        {environmentVariables}
        <p>Container ID: {containerId}</p>
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
