import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sites, setSites] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [consentStatus, setConsentStatus] = useState('consented');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/sites')
      .then((res) => res.json())
      .then((data) => {
        setSites(data);
        if (data.length > 0) setSelectedSiteId(data[0].siteId);
      })
      .catch(() => setError('Could not load sites'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const res = await fetch('http://localhost:5000/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: selectedSiteId, consentStatus }),
      });

      if (!res.ok) throw new Error('Enrollment failed');

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Failed to enroll participant');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '480px' }}>
      <h1>Multicenter Clinical Dashboard</h1>
      <h2>Patient Enrollment</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Site: <br />
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              {sites.map((site) => (
                <option key={site.siteId} value={site.siteId}>
                  {site.siteName} ({site.piName})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Consent status: <br />
            <select
              value={consentStatus}
              onChange={(e) => setConsentStatus(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="pending">Pending</option>
              <option value="consented">Consented</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </label>
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Enroll participant
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e6ffe6' }}>
          <strong>Enrolled successfully</strong>
          <p>Study ID: {result.studyId}</p>
          <p>Enrollment date: {new Date(result.enrollmentDate).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;