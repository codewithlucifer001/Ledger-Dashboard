import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'invoices', label: 'Invoices', icon: '📄' },
    { id: 'time-tracking', label: 'Time tracking', icon: '⏱️' },
    { id: 'contracts', label: 'Contracts', icon: '✍️' },
    { id: 'docs', label: 'Docs', icon: '📖' }
  ];

  return (
    <aside style={{ width: '100%', padding: '16px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '20px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '6px',
          background: 'var(--forest)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
        }}>
          L
        </div>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600 }}>Ledger</span>
      </div>

      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 12px',
              border: 'none',
              background: activeTab === item.id ? 'var(--forest-dim)' : 'transparent',
              color: activeTab === item.id ? 'var(--forest)' : 'var(--ink-soft)',
              fontWeight: activeTab === item.id ? 600 : 400,
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '13.5px',
              textAlign: 'left',
              marginBottom: '4px'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}