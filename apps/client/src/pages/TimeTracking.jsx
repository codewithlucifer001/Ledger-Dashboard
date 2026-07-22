import React, { useState, useEffect } from 'react';
import TimeTracker from '../components/TimeTracker';

export default function TimeTracking() {
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTimeEntries = async () => {
    try {
      const res = await fetch('/api/time');
      if (res.ok) {
        const data = await res.json();
        setTimeEntries(data);
      }
    } catch (err) {
      console.error('Failed to load time entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const formatHours = (secs) => (secs / 3600).toFixed(2);

  return (
    <main>
      <div className="top-row">
        <div>
          <h1>Time Tracking</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            Live timer and historic billable session logs.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '20px' }}>
        <TimeTracker onTimeLogged={fetchTimeEntries} />

        <div className="panel">
          <div className="panel-head">
            <h3>Logged Sessions ({timeEntries.length})</h3>
          </div>
          {loading ? (
            <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>Loading time logs...</div>
          ) : timeEntries.length === 0 ? (
            <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>No logged sessions yet.</div>
          ) : (
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '16px' }}>Description</th>
                    <th>Client</th>
                    <th>Duration</th>
                    <th style={{ paddingRight: '16px', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {timeEntries.map((entry) => (
                    <tr key={entry._id}>
                      <td style={{ paddingLeft: '16px', fontWeight: 500 }}>{entry.description}</td>
                      <td>{entry.clientId?.name || '—'}</td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '12px' }}>
                        {formatHours(entry.durationInSeconds)}h (${(formatHours(entry.durationInSeconds) * (entry.hourlyRate || 50)).toFixed(2)})
                      </td>
                      <td style={{ paddingRight: '16px', textAlign: 'right' }}>
                        <span style={{
                          fontSize: '10.5px',
                          fontWeight: 500,
                          padding: '2px 7px',
                          borderRadius: '100px',
                          background: entry.isBilled ? 'var(--forest-dim)' : 'var(--amber-dim)',
                          color: entry.isBilled ? 'var(--forest)' : 'var(--amber)'
                        }}>
                          {entry.isBilled ? 'Billed' : 'Unbilled'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}