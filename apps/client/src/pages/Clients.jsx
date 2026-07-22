import React, { useState, useEffect } from 'react';
import AddClientModal from '../components/AddClientModal';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (err) {
      console.error('Failed to load clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <div className="top-row">
        <div>
          <h1>Clients</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            Manage client directory and contact details.
          </p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setIsClientModalOpen(true)}>
            + New Client
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '20px' }}>
        <div className="panel-head" style={{ gap: '12px' }}>
          <h3>Client Directory ({filteredClients.length})</h3>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--line-strong)',
              fontSize: '12px',
              width: '220px'
            }}
          />
        </div>

        {loading ? (
          <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>Loading directory...</div>
        ) : filteredClients.length === 0 ? (
          <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>No clients found.</div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '16px' }}>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{ paddingRight: '16px', textAlign: 'right' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client._id}>
                    <td style={{ paddingLeft: '16px', fontWeight: 500 }}>{client.name}</td>
                    <td>{client.company || '—'}</td>
                    <td style={{ color: 'var(--ink-soft)' }}>{client.email || '—'}</td>
                    <td style={{ color: 'var(--ink-faint)' }}>{client.phone || '—'}</td>
                    <td style={{ paddingRight: '16px', textAlign: 'right', fontSize: '12px', color: 'var(--ink-faint)' }}>
                      {new Date(client.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onClientAdded={fetchClients}
      />
    </main>
  );
}