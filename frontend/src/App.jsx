import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Checking backend...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('Backend not reachable'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Multicenter Clinical Dashboard</h1>
      <p>Backend status: <strong>{status}</strong></p>
    </div>
  );
}

export default App;