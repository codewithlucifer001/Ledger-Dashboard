import React from 'react';

export default function Docs() {
  return (
    <main style={{ maxWidth: '800px' }}>
      <div className="top-row">
        <div>
          <h1>Documentation</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            System overview and guide for Ledger Operations SaaS.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <div className="panel" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', marginBottom: '10px' }}>1. Getting Started</h3>
          <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
            Ledger combines client CRM, billable time tracking, auto-generated PDF invoices, and digital contract execution into a single unified workspace.
          </p>
        </div>

        <div className="panel" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', marginBottom: '10px' }}>2. Live Operations & Integrations</h3>
          <ul style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
            <li><strong>Database:</strong> Connected live to MongoDB Atlas cluster (`ledger_db`).</li>
            <li><strong>Email Delivery:</strong> Automatic payment reminders dispatched via Resend API.</li>
            <li><strong>Payments:</strong> Subscription billing powered by Stripe Checkout.</li>
            <li><strong>Security:</strong> API endpoints protected via JSON Web Tokens (JWT).</li>
          </ul>
        </div>

        <div className="panel" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', marginBottom: '10px' }}>3. Standard Workflow</h3>
          <ol style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
            <li>Add a client record in the <strong>Clients</strong> directory.</li>
            <li>Draft and execute an agreement in <strong>Contracts & e-Signatures</strong>.</li>
            <li>Log billable work hours using the <strong>Time tracking</strong> widget.</li>
            <li>Generate an <strong>Invoice</strong>—unbilled logged hours import with one click!</li>
            <li>Send single-click payment reminders directly to client inboxes.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}