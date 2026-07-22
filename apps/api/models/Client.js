const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false, // Set to false for local dev testing
    default: 'demo_user_123'
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);