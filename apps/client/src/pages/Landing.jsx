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
    <div style={{ position: 'relative', overflowX: 'hidden', width: '100%', backgroundColor: '#FAF8F2', color: '#211F1A' }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .nav-link-item { color: #6B6656; transition: color 0.15s ease; cursor: pointer; text-decoration: none; }
        .nav-link-item:hover { color: #211F1A; }
        .btn-hover-effect { transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease; }
        .btn-hover-effect:hover { transform: translateY(-1px); }
        .feature-card-hover { transition: background 0.25s ease; }
        .feature-card-hover:hover { background: #FCFAF4 !important; }
        .price-card-hover { transition: transform 0.2s ease; }
        .price-card-hover:hover { transform: translateY(-4px); }
        @keyframes stampIn { to { transform: rotate(-12deg) scale(1); opacity: 1; } }
        @keyframes toastIn { to { opacity: 1; transform: translateY(0); } }

        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .three-col-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .features-border-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        @media (max-width: 850px) {
          .hero-grid, .three-col-grid, .features-border-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-heading { font-size: 34px !important; }
          .section-padding { padding: 48px 0 !important; }
          .hero-cta-buttons { flex-direction: column !important; }
          .hero-cta-buttons button { width: 100% !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 1, padding: '70px 0 50px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px' }}>
          <div className="hero-grid">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500,
                color: '#1F6F5C', background: '#E4EFEB', border: '1px solid #CFE3DC',
                padding: '6px 12px', borderRadius: '100px', marginBottom: '20px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1F6F5C' }}></span>
                Built for freelancers & small studios
              </div>
              <h1 className="hero-heading" style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '44px', lineHeight: 1.15, fontWeight: 600, marginBottom: '20px' }}>
                Get paid <em style={{ fontStyle: 'normal', color: '#1F6F5C' }}>on time</em>,<br />every time.
              </h1>
              <p style={{ fontSize: '15px', color: '#6B6656', maxWidth: '440px', marginBottom: '28px', lineHeight: 1.5 }}>
                Ledger is your client CRM, time tracker, and invoicing desk in one place — with automatic reminders for clients who've gone quiet.
              </p>
              <div className="hero-cta-buttons" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <button
                  className="btn btn-primary btn-hover-effect"
                  onClick={() => onNavigateAuth('register')}
                  style={{ background: '#1F6F5C', color: '#FFFFFF', border: '1px solid #1F6F5C', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Start free — no card needed
                </button>
                <button
                  className="btn btn-hover-effect"
                  onClick={(e) => scrollToSection(e, 'features')}
                  style={{ background: '#FFFFFF', color: '#211F1A', border: '1px solid #D7D0BC', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
                >
                  See a live invoice
                </button>
              </div>
              <div style={{ fontSize: '13px', color: '#A39D89' }}>Free for up to 3 clients · Stripe payments built in</div>
            </div>

            {/* Signature Animated Invoice Demo */}
            <div style={{
              background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '14px',
              boxShadow: '0 20px 40px -15px rgba(33,31,26,0.1)', padding: '24px 20px', position: 'relative', overflow: 'hidden', width: '100%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#A39D89', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '4px' }}>Billed to</div>
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '17px', fontWeight: 600 }}>Northbeam Retail</div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#A39D89', textAlign: 'right' }}>INV-0096<br />Due Jul 24</div>
              </div>
              <div style={{ borderTop: '1px solid #E6E1D3', borderBottom: '1px solid #E6E1D3', padding: '12px 0', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: '#6B6656' }}>
                  <span>API integration — 14.5 hrs</span><span style={{ fontFamily: 'JetBrains Mono, monospace' }}>$580.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: '#6B6656' }}>
                  <span>Code review & deploy — 2.75 hrs</span><span style={{ fontFamily: 'JetBrains Mono, monospace' }}>$110.00</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                <span>Total due</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px' }}>$690.00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#A39D89' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '100px', background: '#F6EEDD', color: '#B8862E' }}>Sent 3 days ago</span>
                via Stripe payment link
              </div>

              <div style={{
                position: 'absolute', top: '20px', right: '16px',
                fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, fontSize: '20px', color: '#1F6F5C',
                border: '3px solid #1F6F5C', borderRadius: '8px', padding: '4px 10px',
                transform: 'rotate(-12deg) scale(0)', opacity: 0,
                animation: 'stampIn 0.5s cubic-bezier(.34,1.56,.64,1) forwards 1s'
              }}>
                PAID
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ borderTop: '1px solid #E6E1D3', borderBottom: '1px solid #E6E1D3', background: '#FFFFFF', padding: '24px 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px' }}>
          <div className="stats-grid">
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '24px', fontWeight: 600 }}>$0</div>
              <div style={{ fontSize: '12px', color: '#A39D89', marginTop: '4px' }}>to get started</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '24px', fontWeight: 600 }}>9 days</div>
              <div style={{ fontSize: '12px', color: '#A39D89', marginTop: '4px' }}>avg. faster payment</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '24px', fontWeight: 600 }}>100%</div>
              <div style={{ fontSize: '12px', color: '#A39D89', marginTop: '4px' }}>auto-tracked</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '24px', fontWeight: 600 }}>2 min</div>
              <div style={{ fontSize: '12px', color: '#A39D89', marginTop: '4px' }}>to send first invoice</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="section-padding" style={{ padding: '70px 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto 36px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1F6F5C', marginBottom: '10px' }}>One desk, not five tabs</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>Everything freelancing actually requires</h2>
            <p style={{ color: '#6B6656', fontSize: '15px' }}>Stop stitching together a CRM, a timer app, an invoice generator, and a spreadsheet of who owes you money.</p>
          </div>
          
          <div className="features-border-grid">
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#E4EFEB', color: '#1F6F5C' }}>◆</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Client CRM</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Every client, project, and conversation history in one record — no more digging through old emails.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#F6EEDD', color: '#B8862E' }}>◷</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Time tracking</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Start a timer per project, tag it billable or not, and pull it straight into an invoice with one click.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#E4EFEB', color: '#1F6F5C' }}>▤</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Auto-generated invoices</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Line items built from logged hours, branded PDF, sent with a Stripe payment link attached.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#F7E8E4', color: '#B14A3A' }}>✎</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Contracts & e-signatures</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Send a contract, get it signed in-browser, and store the signed PDF against the client record.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#F6EEDD', color: '#B8862E' }}>◈</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>"Who hasn't paid" dashboard</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Every overdue invoice surfaced automatically, with days-overdue and a one-click reminder email.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#E4EFEB', color: '#1F6F5C' }}>▣</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Stripe payments</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Clients pay by card straight from the invoice — no separate merchant account setup required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding" style={{ padding: '70px 0', background: '#FFFFFF', borderTop: '1px solid #E6E1D3', borderBottom: '1px solid #E6E1D3' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto 36px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1F6F5C', marginBottom: '10px' }}>Pricing</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>Free while you're small</h2>
            <p style={{ color: '#6B6656', fontSize: '15px' }}>Upgrade only once Ledger is actually saving you client-chasing time.</p>
          </div>

          <div className="three-col-grid">
            <div className="price-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '14px', padding: '24px 20px' }}>
              <div style={{ fontSize: '13px', color: '#6B6656', marginBottom: '8px' }}>Solo — Free</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '30px', fontWeight: 600, marginBottom: '4px' }}>$0<span style={{ fontSize: '14px', color: '#A39D89', fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: '#A39D89', marginBottom: '20px' }}>For freelancers just getting started.</div>
              <ul style={{ listStyle: 'none', fontSize: '13.5px', color: '#6B6656', marginBottom: '24px' }}>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Up to 3 clients</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Unlimited invoices & time tracking</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Stripe payment links</li>
              </ul>
              <button 
                className="btn btn-hover-effect" 
                style={{ width: '100%', justifyContent: 'center', background: 'transparent', color: '#211F1A', border: '1px solid #D7D0BC', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }} 
                onClick={() => handleSelectPlan('solo')}
              >
                Get started
              </button>
            </div>

            <div className="price-card-hover" style={{ border: '2px solid #1F6F5C', borderRadius: '14px', padding: '24px 20px', position: 'relative', background: '#FFFFFF' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '20px', background: '#1F6F5C', color: '#FFFFFF', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>Most popular</div>
              <div style={{ fontSize: '13px', color: '#6B6656', marginBottom: '8px' }}>Studio</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '30px', fontWeight: 600, marginBottom: '4px' }}>$15<span style={{ fontSize: '14px', color: '#A39D89', fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: '#A39D89', marginBottom: '20px' }}>For freelancers juggling a full client roster.</div>
              <ul style={{ listStyle: 'none', fontSize: '13.5px', color: '#6B6656', marginBottom: '24px' }}>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Unlimited clients</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Contracts & e-signatures</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Automated overdue reminders</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Branded invoice templates</li>
              </ul>
              <button 
                className="btn btn-primary btn-hover-effect" 
                style={{ width: '100%', justifyContent: 'center', background: '#1F6F5C', color: '#FFFFFF', border: '1px solid #1F6F5C', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }} 
                onClick={() => handleSelectPlan('studio')}
              >
                Start free trial
              </button>
            </div>

            <div className="price-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '14px', padding: '24px 20px' }}>
              <div style={{ fontSize: '13px', color: '#6B6656', marginBottom: '8px' }}>Team</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '30px', fontWeight: 600, marginBottom: '4px' }}>$39<span style={{ fontSize: '14px', color: '#A39D89', fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: '#A39D89', marginBottom: '20px' }}>For small studios with multiple contractors.</div>
              <ul style={{ listStyle: 'none', fontSize: '13.5px', color: '#6B6656', marginBottom: '24px' }}>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Multiple team members</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Per-project profitability reports</li>
                <li style={{ padding: '6px 0', borderTop: '1px solid #E6E1D3' }}><span style={{ color: '#1F6F5C', marginRight: '8px' }}>✓</span>Priority support</li>
              </ul>
              <button 
                className="btn btn-hover-effect" 
                style={{ width: '100%', justifyContent: 'center', background: 'transparent', color: '#211F1A', border: '1px solid #D7D0BC', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }} 
                onClick={() => handleSelectPlan('team')}
              >
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Docs / How it works Section */}
      <section id="docs" className="section-padding" style={{ padding: '70px 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto 36px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1F6F5C', marginBottom: '10px' }}>Docs & Overview</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>How Ledger Works</h2>
            <p style={{ color: '#6B6656', fontSize: '15px' }}>Simple, streamlined workflows designed for freelance operations.</p>
          </div>

          <div className="three-col-grid">
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>1. Add Clients & Contracts</div>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Track client details and execute e-signatures right inside the platform.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>2. Log Time & Auto-Invoice</div>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Track billable project hours and generate single-click invoices.</p>
            </div>
            <div className="feature-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E6E1D3', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>3. Auto Reminders & Paid Stamps</div>
              <p style={{ fontSize: '13.5px', color: '#6B6656', lineHeight: 1.5 }}>Dispatches email notifications to overdue accounts with Stripe links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '28px 0', borderTop: '1px solid #E6E1D3', background: '#FAF8F2' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#A39D89' }}>
          <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#211F1A' }}>
            <div style={{ width: '22px', height: '22px', fontSize: '12px', borderRadius: '5px', background: '#1F6F5C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, Georgia, serif' }}>L</div>
            Ledger
          </div>
          <div>© 2026 Ledger. Built for people who bill by the hour.</div>
        </div>
      </footer>
    </div>
  );
}