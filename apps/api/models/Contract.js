const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  userId: { type: String, default: 'demo_user_123' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  signatureData: { type: String, default: '' }, // Data URL or typed signature
  status: { type: String, enum: ['draft', 'signed'], default: 'draft' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contract', ContractSchema);