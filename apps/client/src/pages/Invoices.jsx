import React, { useState, useEffect } from 'react';
import AddInvoiceModal from '../components/AddInvoiceModal';
import InvoiceViewModal from '../components/InvoiceViewModal';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/invoices');
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchInvoices();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus === 'all') return true;
    return inv.status === filterStatus;
  });

  return (
    <main>
      <div className="top-row">
        <div>
          <h1>Invoices</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            Track, filter, and manage all billing records.
          </p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setIsInvoiceModalOpen(true)}>
            + New Invoice
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '20px' }}>
        <div className="panel-head">
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'unpaid', 'paid', 'overdue'].map((status) => (
              <button
                key={status}
                className="btn"
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  textTransform: 'capitalize',
                  background: filterStatus === status ? 'var(--line-strong)' : 'transparent'
                }}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>
            Showing {filteredInvoices.length} invoices
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>Loading invoices...</div>
        ) : filteredInvoices.length === 0 ? (
          <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>No invoices match this filter.</div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '16px' }}>Invoice #</th>
                  <th>Client</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ paddingRight: '16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => (
                  <tr key={inv._id}>
                    <td style={{ paddingLeft: '16px', fontFamily: 'var(--mono)', fontWeight: 500 }}>
                      {inv.invoiceNumber}
                    </td>
                    <td>{inv.clientId?.name || 'Client'}</td>
                    <td style={{ color: 'var(--ink-soft)', fontSize: '12px' }}>
                      {new Date(inv.dueDate).toLocaleDateString()}
                    </td>
                    <td className="amount" style={{ fontWeight: 600 }}>${(inv.totalAmount || 0).toFixed(2)}</td>
                    <td>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: 500,
                        padding: '2px 7px',
                        borderRadius: '100px',
                        background: inv.status === 'paid' ? 'var(--forest-dim)' : inv.status === 'overdue' ? 'var(--rust-dim)' : 'var(--amber-dim)',
                        color: inv.status === 'paid' ? 'var(--forest)' : inv.status === 'overdue' ? 'var(--rust)' : 'var(--amber)'
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ paddingRight: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        <button className="btn" style={{ fontSize: '11px', padding: '3px 8px' }} onClick={() => setSelectedInvoice(inv)}>
                          View
                        </button>
                        {inv.status !== 'paid' && (
                          <button className="btn" style={{ fontSize: '11px', padding: '3px 8px' }} onClick={() => handleStatusChange(inv._id, 'paid')}>
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onInvoiceAdded={fetchInvoices}
      />

      <InvoiceViewModal
        isOpen={!!selectedInvoice}
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </main>
  );
}