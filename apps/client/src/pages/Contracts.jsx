import React, { useState, useEffect } from 'react';

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState('');
  const [title, setTitle] = useState('Standard Service Agreement');
  const [content, setContent] = useState('This agreement outlines the scope of work, payment terms, and deliverable schedules...');
  const [selectedContract, setSelectedContract] = useState(null);
  const [signature, setSignature] = useState('');

  const fetchInitialData = async () => {
    try {
      const [resContracts, resClients] = await Promise.all([
        fetch('/api/contracts'),
        fetch('/api/clients')
      ]);
      if (resContracts.ok) setContracts(await resContracts.json());
      if (resClients.ok) {
        const clientData = await resClients.json();
        setClients(clientData);
        if (clientData.length > 0) setSelectedClient(clientData[0]._id);
      }
    } catch (err) {
      console.error('Error loading contract data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCreateContract = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: selectedClient, title, content })
      });
      if (res.ok) fetchInitialData();
    } catch (err) {
      console.error('Failed to create contract:', err);
    }
  };

  const handleSignContract = async () => {
    if (!signature) return alert('Please enter a signature name.');
    try {
      const res = await fetch(`/api/contracts/${selectedContract._id}/sign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signatureData: signature })
      });
      if (res.ok) {
        setSelectedContract(null);
        setSignature('');
        fetchInitialData();
      }
    } catch (err) {
      console.error('Error signing contract:', err);
    }
  };

  return (
    <main>
      <div className="top-row">
        <div>
          <h1>Contracts & e-Signatures</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            Draft agreements and execute digital signatures in-browser.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '20px' }}>
        {/* Create Contract Panel */}
        <div className="panel" style={{ padding: '20px' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', marginBottom: '16px' }}>Draft Agreement</h3>
          <form onSubmit={handleCreateContract}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Select Client</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)', marginTop: '4px' }}
              >
                {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Agreement Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)', marginTop: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Terms & Scope</label>
              <textarea
                rows="5"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)', marginTop: '4px', fontSize: '12px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Create Contract
            </button>
          </form>
        </div>

        {/* Contract Records List */}
        <div className="panel">
          <div className="panel-head">
            <h3>Contract Directory ({contracts.length})</h3>
          </div>
          {loading ? (
            <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>Loading agreements...</div>
          ) : contracts.length === 0 ? (
            <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>No contracts created yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '16px' }}>Title</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th style={{ paddingRight: '16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map(contract => (
                  <tr key={contract._id}>
                    <td style={{ paddingLeft: '16px', fontWeight: 500 }}>{contract.title}</td>
                    <td>{contract.clientId?.name || '—'}</td>
                    <td>
                      <span style={{
                        fontSize: '10.5px',
                        padding: '2px 7px',
                        borderRadius: '100px',
                        background: contract.status === 'signed' ? 'var(--forest-dim)' : 'var(--amber-dim)',
                        color: contract.status === 'signed' ? 'var(--forest)' : 'var(--amber)'
                      }}>
                        {contract.status}
                      </span>
                    </td>
                    <td style={{ paddingRight: '16px', textAlign: 'right' }}>
                      <button
                        className="btn"
                        style={{ fontSize: '11px', padding: '2px 6px' }}
                        onClick={() => setSelectedContract(contract)}
                      >
                        {contract.status === 'signed' ? 'View' : 'Sign'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Signing Canvas Modal */}
      {selectedContract && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', maxWidth: '500px', width: '100%' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', marginBottom: '8px' }}>{selectedContract.title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '16px', whiteSpace: 'pre-wrap', background: 'var(--bg)', padding: '12px', borderRadius: '6px' }}>
              {selectedContract.content}
            </p>

            {selectedContract.status === 'signed' ? (
              <div style={{ color: 'var(--forest)', fontSize: '13px', fontWeight: 600 }}>
                ✓ Digitally signed as: <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '16px' }}>{selectedContract.signatureData}</span>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '4px' }}>Type Full Legal Name to Sign</label>
                <input
                  type="text"
                  placeholder="e.g. Ali Majeed"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)', marginBottom: '16px', fontFamily: 'var(--serif)', fontSize: '16px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button className="btn" onClick={() => setSelectedContract(null)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSignContract}>Execute Signature</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}