const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    businessName: { type: String, default: '' },
    currency: { type: String, default: 'USD' },
    hourlyRate: { type: Number, default: 0 },
    stripeAccountId: { type: String, default: '' } // For Stripe Connect / Express
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);