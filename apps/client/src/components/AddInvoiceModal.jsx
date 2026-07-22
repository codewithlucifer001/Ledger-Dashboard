import React, { useState, useEffect } from 'react';

export default function AddInvoiceModal({ isOpen, onClose, onInvoiceAdded }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-0099');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ description: 'Development Services', hoursOrQty: 1, unitPrice: 100 }]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch clients on open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/clients')
        .then((res) => res.json())
        .then((data) => {
          setClients(data);
          if (data.length > 0) setSelectedClient(data[0]._id);
        })
        .catch((err) => console.error('Error loading clients:', err));
    }
  }, [isOpen]);

  // Fetch unbilled time entries when client changes
  useEffect(() => {
    if (isOpen && selectedClient) {
      fetch('/api/time')
        .then((res) => res.json())
        .then((data) => {
          // Filter unbilled entries for this client
          const clientEntries = data.filter(entry => 
            (!entry.isBilled) && 
            (entry.clientId?._id === selectedClient || entry.clientId === selectedClient)
          );
          setTimeEntries(clientEntries);
        })
        .catch((err) => console.error('Error loading time entries:', err));
    }
  }, [isOpen, selectedClient]);

  if (!isOpen) return null;

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { description: '', hoursOrQty: 1, unitPrice: 0 }]);
  };

  const importTimeEntry = (entry) => {
    const hours = (entry.durationInSeconds / 3600).toFixed(2);
    const newItem = {
      description: entry.description || 'Tracked Session',
      hoursOrQty: Number(hours) > 0 ? Number(hours) : 0.1,
      unitPrice: entry.hourlyRate || 50
    };

    // If first line item is default/blank, replace it, otherwise append
    if (items.length === 1 && items[0].description === 'Development Services' && items[0].unitPrice === 100) {
      setItems([newItem]);
    } else {
      setItems([...items, newItem]);
    }

    // Remove from unbilled preview list locally
    setTimeEntries(timeEntries.filter(t => t._id !== entry._id));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (Number(item.hoursOrQty) * Number(item.unitPrice)), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!selectedClient) {
      setError('Please select a valid client.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClient,
          invoiceNumber,
          dueDate,
          items: items.map(i => ({
            description: i.description || 'Service Line Item',
            hoursOrQty: Number(i.hoursOrQty) || 1,
            unitPrice: Number(i.unitPrice) || 0
          }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create invoice');
      }

      onInvoiceAdded(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px',
        padding: '24px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', marginBottom: '16px' }}>Create New Invoice</h3>
        {error && <div style={{ color: 'var(--rust)', marginBottom: '12px', fontSize: '12px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '4px' }}>Select Client *</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)', background: '#fff' }}
              >
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>{c.name} ({c.company || 'Individual'})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '4px' }}>Invoice #</label>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '4px' }}>Due Date *</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line-strong)' }}
            />
          </div>

          {/* Logged Time Entries Helper Box */}
          {timeEntries.length > 0 && (
            <div style={{
              background: 'var(--forest-dim)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--forest)', marginBottom: '6px' }}>
                Unbilled Tracked Time Available
              </div>
              {timeEntries.map((entry) => (
                <div key={entry._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>
                    {entry.description} ({(entry.durationInSeconds / 3600).toFixed(2)}h @ ${entry.hourlyRate}/h)
                  </span>
                  <button
                    type="button"
                    className="btn"
                    style={{ fontSize: '10px', padding: '2px 6px', color: 'var(--forest)' }}
                    onClick={() => importTimeEntry(entry)}
                  >
                    + Import Line
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '8px' }}>Line Items</label>
            {items.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="Description"
                  required
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line-strong)' }}
                />
                <input
                  type="number"
                  placeholder="Qty/Hrs"
                  step="0.01"
                  required
                  value={item.hoursOrQty}
                  onChange={(e) => handleItemChange(idx, 'hoursOrQty', e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line-strong)' }}
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  required
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line-strong)' }}
                />
              </div>
            ))}
            <button type="button" className="btn" style={{ fontSize: '11px', marginTop: '4px' }} onClick={addItemRow}>
              + Add Item
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '16px', marginTop: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Total: </span>
              <strong style={{ fontFamily: 'var(--mono)', fontSize: '18px' }}>${calculateTotal().toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}