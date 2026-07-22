const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Pricing tiers map
const TIER_PRICES = {
  solo: 0,
  studio: 15,
  team: 39
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body; // 'solo' | 'studio' | 'team'

    // If Solo / Free tier, skip payment checkout
    if (plan === 'solo' || !plan) {
      return res.json({ url: '/app' });
    }

    const priceAmount = TIER_PRICES[plan] || 15;

    // Build Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Ledger ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: 'Monthly SaaS subscription for Ledger Operations'
            },
            unit_amount: priceAmount * 100, // Price in cents
            recurring: { interval: 'month' }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin || 'http://localhost:5173'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:5173'}`
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ message: 'Stripe checkout error: ' + error.message });
  }
};