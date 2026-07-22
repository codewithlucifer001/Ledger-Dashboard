import React, { useState, useEffect } from 'react';

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [description, setDescription] = useState('API integration & Frontend work');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch clients for dropdown
  useEffect(() => {
    fetch('/api/clients')
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        if (data.length > 0) setSelectedClient(data[0]._id);
      })
      .catch((err) => console.error('Failed to load clients in tracker:', err));
  }, []);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStopAndLog = async () => {
    if (seconds === 0) {
      alert('Start the timer before logging time!');
      return;
    }

    setLoading(true);
    setIsRunning(false);

    try {
      const res = await fetch('/api/time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClient || null,
          description,
          durationInSeconds: seconds,
          hourlyRate: 50
        })
      });

      if (res.ok) {
        alert(`Logged ${formatTime(seconds)} to database successfully!`);
        setSeconds(0);
      } else {
        alert('Failed to log time entry.');
      }
    } catch (err) {
      console.error('Error logging time:', err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Time tracker</h3>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '28px', fontWeight: 600 }}>
            {formatTime(seconds)}
          </div>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isRunning ? 'var(--forest)' : 'var(--ink-faint)',
            display: 'inline-block'
          }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Work description..."
            style={{
              width: '100%',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid var(--line-strong)',
              fontSize: '12px',
              marginBottom: '8px'
            }}
          />
          {clients.length > 0 && (
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--line-strong)',
                fontSize: '12px',
                background: '#fff'
              }}
            >
              {clients.map((c) => (
                <option key={c._id} value={c._id}>{c.name} ({c.company || 'Individual'})</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn"
            style={{ flex: 1 }}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handleStopAndLog}
            disabled={loading}
          >
            {loading ? 'Logging...' : 'Stop & log'}
          </button>
        </div>
      </div>
    </div>
  );
}