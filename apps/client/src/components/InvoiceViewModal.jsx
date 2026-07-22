import React from 'react';

export default function InvoiceViewModal({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px',
        padding: '32px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto'
      }}>
        {/* Printable Section */}
        <div id="printable-invoice">
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--line)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', margin: 0 }}>INVOICE</h2>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '4px' }}>
                #{invoice.invoiceNumber}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Ledger Operations</div>
              <div style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>Status: {invoice.status?.toUpperCase()}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '13px' }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--ink-soft)', marginBottom: '4px' }}>Billed To:</strong>
              <div>{invoice.clientId?.name || 'Client'}</div>
              <div>{invoice.clientId?.company}</div>
              <div style={{ color: 'var(--ink-faint)' }}>{invoice.clientId?.email}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ display: 'block', color: 'var(--ink-soft)', marginBottom: '4px' }}>Invoice Details:</strong>
              <div>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</div>
              <div>Date Created: {new Date(invoice.createdAt || Date.now()).toLocaleDateString()}</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)', textAlign: 'left' }}>
                <th style={{ padding: '8px 0' }}>Description</th>
                <th style={{ padding: '8px 0', textAlign: 'center' }}>Qty / Hrs</th>
                <th style={{ padding: '8px 0', textAlign: 'right' }}>Rate</th>
                <th style={{ padding: '8px 0', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '10px 0' }}>{item.description}</td>
                  <td style={{ padding: '10px 0', textAlign: 'center' }}>{item.hoursOrQty}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right' }}>${Number(item.unitPrice).toFixed(2)}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right' }}>${(item.hoursOrQty * item.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '2px solid var(--line)', paddingTop: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: 'var(--ink-soft)', marginRight: '16px' }}>Total Amount:</span>
              <strong style={{ fontFamily: 'var(--mono)', fontSize: '20px' }}>${(invoice.totalAmount || 0).toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <button type="button" className="btn" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handlePrint}>Print / Save PDF</button>
        </div>
      </div>
    </div>
  );
}