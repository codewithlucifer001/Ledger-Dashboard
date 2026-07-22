import React from 'react';

export default function Landing({ onNavigateAuth }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = async (planName) => {
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planName })
      });
      const data = await res.json();
      if (data.url) {
        if (data.url.startsWith('http')) {
          window.location.href = data.url;
        } else {
          onNavigateAuth('register');
        }
      }
    } catch (err) {
      console.error('Checkout error:', err);
      onNavigateAuth('register');
    }
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .nav-link-item { color: var(--ink-soft); transition: color 0.15s ease; cursor: pointer; text-decoration: none; }
        .nav-link-item:hover { color: var(--ink); }
        .btn-hover-effect { transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease; }
        .btn-hover-effect:hover { transform: translateY(-1px); }
        .btn-primary-hover:hover { background: var(--forest-dark) !important; box-shadow: 0 10px 22px -10px rgba(31,111,92,0.55) !important; }
        .feature-card-hover { transition: background 0.25s ease; }
        .feature-card-hover:hover { background: #FCFAF4 !important; }
        .price-card-hover { transition: transform 0.2s ease; }
        .price-card-hover:hover { transform: translateY(-4px); }
        @keyframes stampIn { to { transform: rotate(-12deg) scale(1); opacity: 1; } }
        @keyframes toastIn { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Hero Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '90px 0 60px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500,
              color: 'var(--forest)', background: 'var(--forest-dim)', border: '1px solid #CFE3DC',
              padding: '6px 12px', borderRadius: '100px', marginBottom: '22px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--forest)' }}></span>
              Built for freelancers & small studios
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '46px', lineHeight: 1.1, fontWeight: 600, marginBottom: '20px' }}>
              Get paid <em style={{ fontStyle: 'normal', color: 'var(--forest)' }}>on time</em>,<br />every time.
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '440px', marginBottom: '32px' }}>
              Ledger is your client CRM, time tracker, and invoicing desk in one place — with automatic reminders for the clients who've gone quiet.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <button
                className="btn btn-primary btn-hover-effect btn-primary-hover"
                onClick={() => onNavigateAuth('register')}
                style={{ background: 'var(--forest)', color: '#fff', border: '1px solid var(--forest)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
              >
                Start free — no card needed
              </button>
              <button
                className="btn btn-hover-effect"
                onClick={(e) => scrollToSection(e, 'features')}
                style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-strong)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
              >
                See a live invoice
              </button>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--ink-faint)' }}>Free for up to 3 clients · Stripe payments built in</div>
          </div>

          {/* Signature Animated Invoice Demo */}
          <div style={{
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px',
            boxShadow: '0 40px 70px -40px rgba(33,31,26,0.25)', padding: '26px 28px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '4px' }}>Billed to</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 600 }}>Northbeam Retail</div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink-faint)', textAlign: 'right' }}>INV-0096<br />Due Jul 24</div>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '14px 0', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: 'var(--ink-soft)' }}>
                <span>API integration — 14.5 hrs</span><span style={{ fontFamily: 'var(--mono)' }}>$580.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: 'var(--ink-soft)' }}>
                <span>Code review & deploy — 2.75 hrs</span><span style={{ fontFamily: 'var(--mono)' }}>$110.00</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              <span>Total due</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '22px' }}>$690.00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--ink-faint)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', background: 'var(--amber-dim)', color: 'var(--amber)' }}>Sent 3 days ago</span>
              via Stripe payment link
            </div>

            <div style={{
              position: 'absolute', top: '38px', right: '30px',
              fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '26px', color: 'var(--forest)',
              border: '3px solid var(--forest)', borderRadius: '8px', padding: '6px 16px',
              transform: 'rotate(-12deg) scale(0)', opacity: 0,
              animation: 'stampIn 0.5s cubic-bezier(.34,1.56,.64,1) forwards 2.1s'
            }}>
              PAID
            </div>

            <div style={{
              position: 'absolute', left: '28px', bottom: '-60px', right: '28px',
              background: 'var(--forest-dark)', color: '#fff', borderRadius: '10px', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px',
              opacity: 0, transform: 'translateY(10px)',
              animation: 'toastIn 0.5s ease forwards 1.7s'
            }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>✓</div>
              Payment received — receipt emailed automatically
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--paper)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '34px 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)' }}><div style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 600 }}>$0</div><div style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '4px' }}>to get started</div></div>
          <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)' }}><div style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 600 }}>9 days</div><div style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '4px' }}>avg. faster payment</div></div>
          <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)' }}><div style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 600 }}>100%</div><div style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '4px' }}>of invoices auto-tracked</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 600 }}>2 min</div><div style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '4px' }}>to send your first invoice</div></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" style={{ padding: '90px 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto 52px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--forest)', marginBottom: '12px' }}>One desk, not five tabs</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 600, marginBottom: '14px' }}>Everything freelancing actually requires</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px' }}>Stop stitching together a CRM, a timer app, an invoice generator, and a spreadsheet of who owes you money.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', background: 'var(--forest-dim)', color: 'var(--forest)' }}>◆</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Client CRM</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Every client, project, and conversation history in one record — no more digging through old emails.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', background: 'var(--amber-dim)', color: 'var(--amber)' }}>◷</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Time tracking</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Start a timer per project, tag it billable or not, and pull it straight into an invoice with one click.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', background: 'var(--forest-dim)', color: 'var(--forest)' }}>▤</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Auto-generated invoices</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Line items built from logged hours, branded PDF, sent with a Stripe payment link attached.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', background: 'var(--rust-dim)', color: 'var(--rust)' }}>✎</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Contracts & e-signatures</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Send a contract, get it signed in-browser, and store the signed PDF against the client record.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', background: 'var(--amber-dim)', color: 'var(--amber)' }}>◈</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>"Who hasn't paid" dashboard</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Every overdue invoice surfaced automatically, with days-overdue and a one-click reminder email.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', background: 'var(--forest-dim)', color: 'var(--forest)' }}>▣</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Stripe payments</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Clients pay by card straight from the invoice — no separate merchant account setup required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '90px 0', background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto 52px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--forest)', marginBottom: '12px' }}>Pricing</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 600, marginBottom: '14px' }}>Free while you're small</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px' }}>Upgrade only once Ledger is actually saving you client-chasing time.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            <div className="price-card-hover" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px 28px' }}>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', marginBottom: '10px' }}>Solo — Free</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 600, marginBottom: '4px' }}>$0<span style={{ fontSize: '14px', color: 'var(--ink-faint)', fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: 'var(--ink-faint)', marginBottom: '22px' }}>For freelancers just getting started.</div>
              <ul style={{ listStyle: 'none', fontSize: '13.5px', color: 'var(--ink-soft)', marginBottom: '26px' }}>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Up to 3 clients</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Unlimited invoices & time tracking</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Stripe payment links</li>
              </ul>
              <button className="btn btn-hover-effect" style={{ width: '100%', justifyContent: 'center', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-strong)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }} onClick={() => handleSelectPlan('solo')}>Get started</button>
            </div>
            <div className="price-card-hover" style={{ border: '1px solid var(--forest)', borderRadius: '14px', padding: '32px 28px', position: 'relative', background: 'linear-gradient(180deg, var(--forest-dim), transparent 40%), var(--paper)' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '28px', background: 'var(--forest)', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px' }}>Most popular</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', marginBottom: '10px' }}>Studio</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 600, marginBottom: '4px' }}>$15<span style={{ fontSize: '14px', color: 'var(--ink-faint)', fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: 'var(--ink-faint)', marginBottom: '22px' }}>For freelancers juggling a full client roster.</div>
              <ul style={{ listStyle: 'none', fontSize: '13.5px', color: 'var(--ink-soft)', marginBottom: '26px' }}>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Unlimited clients</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Contracts & e-signatures</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Automated overdue reminders</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Branded invoice templates</li>
              </ul>
              <button className="btn btn-primary btn-hover-effect btn-primary-hover" style={{ width: '100%', justifyContent: 'center', background: 'var(--forest)', color: '#fff', border: '1px solid var(--forest)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }} onClick={() => handleSelectPlan('studio')}>Start free trial</button>
            </div>
            <div className="price-card-hover" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px 28px' }}>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', marginBottom: '10px' }}>Team</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 600, marginBottom: '4px' }}>$39<span style={{ fontSize: '14px', color: 'var(--ink-faint)', fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: 'var(--ink-faint)', marginBottom: '22px' }}>For small studios with multiple contractors.</div>
              <ul style={{ listStyle: 'none', fontSize: '13.5px', color: 'var(--ink-soft)', marginBottom: '26px' }}>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Multiple team members</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Per-project profitability reports</li>
                <li style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}><span style={{ color: 'var(--forest)', marginRight: '9px' }}>✓</span>Priority support</li>
              </ul>
              <button className="btn btn-hover-effect" style={{ width: '100%', justifyContent: 'center', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-strong)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }} onClick={() => handleSelectPlan('team')}>Talk to us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Docs / How it works Section */}
      <section id="docs" style={{ padding: '90px 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--forest)', marginBottom: '12px' }}>Docs & Overview</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 600, marginBottom: '14px' }}>How Ledger Works</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px' }}>Simple, streamlined workflows designed for freelance operations.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>1. Add Clients & Contracts</div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>Track client details and execute e-signatures right inside the platform.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>2. Log Time & Auto-Invoice</div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>Track billable project hours and generate single-click invoices.</p>
            </div>
            <div className="feature-card-hover" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>3. Auto Reminders & Paid Stamps</div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>Dispatches email notifications to overdue accounts with Stripe links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--ink-faint)' }}>
          <div className="brand" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="mark" style={{ width: '22px', height: '22px', fontSize: '12px', borderRadius: '5px', background: 'var(--forest)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)' }}>L</div>Ledger
          </div>
          <div>© 2026 Ledger. Built for people who bill by the hour.</div>
        </div>
      </footer>
    </div>
  );
}