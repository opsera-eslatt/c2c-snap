import React from 'react';
import logo from './logo.svg';
import './App.css';

const getContainerId = async () => {
  try {
    const response = await fetch('/api/container-id'); // Assuming you have an endpoint that returns the container ID
    const data = await response.json();
    return data.containerId;
  } catch (error) {
    console.error('Error getting container ID:', error.message);
    return null;
  }
};

function App() {
  // Get all environment variables
  const environmentVariables = Object.keys(process.env).map(key => (
    <p key={key}>{`${key}: ${process.env[key]}`}</p>
  ));

  const [containerId, setContainerId] = useState(null);

  useEffect(() => {
    const fetchContainerId = async () => {
      const id = await getContainerId();
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
