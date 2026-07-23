import React, { useState, useEffect } from 'react';
import TimeTracker from '../components/TimeTracker';
import AddClientModal from '../components/AddClientModal';
import AddInvoiceModal from '../components/AddInvoiceModal';
import InvoiceViewModal from '../components/InvoiceViewModal';

export default function Dashboard() {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({ outstanding: 0, overdue: 0, paid: 0 });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/invoices');
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);

        let totalOut = 0;
        let totalOverdue = 0;
        let totalPaid = 0;

        data.forEach(inv => {
          if (inv.status === 'unpaid') {
            totalOut += inv.totalAmount || 0;
          } else if (inv.status === 'overdue') {
            totalOut += inv.totalAmount || 0;
            totalOverdue += inv.totalAmount || 0;
          } else if (inv.status === 'paid') {
            totalPaid += inv.totalAmount || 0;
          }
        });

        setStats({ outstanding: totalOut, overdue: totalOverdue, paid: totalPaid });
      }
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchDashboardData();
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSendReminder = async (invoiceId) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/reminder`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Failed to send reminder.');
      }
    } catch (err) {
      console.error('Reminder error:', err);
    }
  };

  return (
    <main style={{ minWidth: 0, width: '100%' }}>
      <div className="top-row">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            Live ops summary connected to MongoDB Atlas.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => setIsClientModalOpen(true)}>New client</button>
          <button className="btn btn-primary" onClick={() => setIsInvoiceModalOpen(true)}>New invoice</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value">${stats.outstanding.toFixed(2)}</div>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '6px' }}>across active invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Overdue</div>
          <div className="stat-value rust">${stats.overdue.toFixed(2)}</div>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '6px' }}>requires follow up</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Paid</div>
          <div className="stat-value forest">${stats.paid.toFixed(2)}</div>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '6px' }}>settled invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Billable hours</div>
          <div className="stat-value">27.5<span style={{ fontSize: '14px', color: 'var(--ink-faint)' }}>h</span></div>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '6px' }}>this week</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel" style={{ overflow: 'hidden' }}>
          <div className="panel-head">
            <h3>Recent Invoices</h3>
            <span style={{ fontSize: '11px', color: 'var(--forest)', background: 'var(--forest-dim)', padding: '3px 9px', borderRadius: '100px', fontWeight: 500 }}>
              {invoices.length} total
            </span>
          </div>
          {loading ? (
            <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>Loading live data...</div>
          ) : invoices.length === 0 ? (
            <div style={{ padding: '20px', color: 'var(--ink-faint)' }}>No invoices found.</div>
          ) : (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '16px' }}>Client</th>
                    <th>Invoice</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right', paddingRight: '16px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv._id}>
                      <td style={{ paddingLeft: '16px', maxWidth: '160px' }}>
                        <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inv.clientId?.name || 'Client'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inv.clientId?.email || ''}
                        </div>
                      </td>
                      <td className="amount" style={{ fontSize: '12px' }}>{inv.invoiceNumber}</td>
                      <td className="amount" style={{ fontSize: '12px' }}>${(inv.totalAmount || 0).toFixed(2)}</td>
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
                      <td style={{ textAlign: 'right', paddingRight: '16px' }}>
                        <div style={{ display: 'inline-flex', gap: '4px', justifyContent: 'flex-end' }}>
                          <button 
                            className="btn" 
                            style={{ fontSize: '11px', padding: '4px 8px', lineHeight: 1 }}
                            onClick={() => setSelectedInvoice(inv)}
                          >
                            View
                          </button>
                          {inv.status !== 'paid' && (
                            <button 
                              className="btn" 
                              style={{ fontSize: '11px', padding: '4px 8px', lineHeight: 1 }}
                              onClick={() => handleStatusChange(inv._id, 'paid')}
                            >
                              Paid
                            </button>
                          )}
                          <button 
                            className="btn" 
                            style={{ fontSize: '11px', padding: '4px 8px', color: 'var(--forest)', lineHeight: 1 }}
                            onClick={() => handleSendReminder(inv._id)}
                          >
                            Remind
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TimeTracker />
          <div className="panel">
            <div className="panel-head">
              <h3>Database Status</h3>
            </div>
            <div style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--ink-soft)' }}>
              🟢 Live connected to MongoDB Atlas.
            </div>
          </div>
        </div>
      </div>

      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onClientAdded={fetchDashboardData}
      />

      <AddInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onInvoiceAdded={fetchDashboardData}
      />

      <InvoiceViewModal
        isOpen={!!selectedInvoice}
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </main>
  );
}