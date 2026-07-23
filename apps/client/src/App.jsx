import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Invoices from './pages/Invoices';
import TimeTracking from './pages/TimeTracking';
import Contracts from './pages/Contracts';
import Docs from './pages/Docs';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'auth' | 'app'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check stored token on load
  useEffect(() => {
    const token = localStorage.getItem('ledger_token');
    if (token) {
      setView('app');
    }
  }, []);

  const handleStartAuth = (mode) => {
    setAuthMode(mode);
    setView('auth');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setView('app');
  };

  const handleSignOut = () => {
    localStorage.removeItem('ledger_token');
    setUser(null);
    setView('landing');
  };

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'invoices':
        return <Invoices />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'contracts':
        return <Contracts />;
      case 'docs':
        return <Docs />;
      default:
        return <Dashboard />;
    }
  };

  if (view === 'landing') {
    return (
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,242,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--line)', width: '100%' }}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box' }}>
            {/* Logo / Brand */}
            <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <div className="mark" style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'var(--forest)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontWeight: 600 }}>L</div>
              <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '18px' }}>Ledger</span>
            </div>

            {/* Nav Links - Hidden on Mobile via CSS */}
            <div className="nav-links-desktop" style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--ink-soft)' }}>
              <a href="#features" className="nav-link-item" onClick={(e) => handleScrollTo(e, 'features')}>Product</a>
              <a href="#docs" className="nav-link-item" onClick={(e) => handleScrollTo(e, 'docs')}>How it works</a>
              <a href="#pricing" className="nav-link-item" onClick={(e) => handleScrollTo(e, 'pricing')}>Pricing</a>
              <a href="#docs" className="nav-link-item" onClick={(e) => handleScrollTo(e, 'docs')}>Docs</a>
            </div>

            {/* Auth Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                className="btn btn-hover-effect" 
                style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-strong)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }} 
                onClick={() => handleStartAuth('login')}
              >
                Sign in
              </button>
              <button 
                className="btn btn-primary btn-hover-effect btn-primary-hover" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => handleStartAuth('register')}
              >
                Start free
              </button>
            </div>
          </div>
        </nav>
        <Landing onNavigateAuth={(mode) => handleStartAuth(mode)} />
      </div>
    );
  }

  if (view === 'auth') {
    return (
      <Auth
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
        onBackToLanding={() => setView('landing')}
      />
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid var(--line)', minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--line)' }}>
          <button
            onClick={handleSignOut}
            className="btn"
            style={{ width: '100%', fontSize: '12px', justifyContent: 'center', color: 'var(--rust)' }}
          >
            Sign out
          </button>
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px 32px', overflowX: 'hidden' }}>
        {renderActivePage()}
      </div>
    </div>
  );
}