import React, { useState } from 'react';

export default function Auth({ initialMode = 'login', onAuthSuccess, onBackToLanding }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save token and pass user data up
      if (data.token) {
        localStorage.setItem('ledger_token', data.token);
      }
      
      onAuthSuccess(data.user || { email, name });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'var(--bg)'
    }}>
      <div style={{
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        borderRadius: '16px',
        padding: '36px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 40px -20px rgba(33,31,26,0.15)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'var(--forest)', color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '18px', marginBottom: '12px'
          }}>
            L
          </div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 600 }}>
            {isLogin ? 'Welcome back' : 'Create your desk'}
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '4px' }}>
            {isLogin ? 'Sign in to access your client ledger' : 'Start tracking time and sending invoices in 2 minutes'}
          </p>
        </div>

        {error && (
          <div style={{
            background: 'var(--rust-dim)', color: 'var(--rust)',
            padding: '10px 12px', borderRadius: '8px', fontSize: '12.5px',
            marginBottom: '18px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                required
                placeholder="Ali Majeed"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line-strong)', fontSize: '13.5px' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              required
              placeholder="ali@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line-strong)', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line-strong)', fontSize: '13.5px' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Free Desk'}
          </button>
        </form>

        {/* Mode Toggle */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--ink-soft)' }}>
          {isLogin ? "Don't have a desk yet? " : 'Already have a desk? '}
          <button
            type="button"
            style={{ background: 'none', border: 'none', color: 'var(--forest)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Start free' : 'Sign in'}
          </button>
        </div>

        {/* Return to Landing */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            style={{ background: 'none', border: 'none', color: 'var(--ink-faint)', fontSize: '12px', cursor: 'pointer' }}
            onClick={onBackToLanding}
          >
            ← Back to website
          </button>
        </div>
      </div>
    </div>
  );
}