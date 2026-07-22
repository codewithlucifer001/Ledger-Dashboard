const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    default: 'demo_user_123'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [
    {
      description: { type: String, required: true },
      hoursOrQty: { type: Number, required: true, default: 1 },
      unitPrice: { type: Number, required: true, default: 0 }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid', 'overdue'],
    default: 'unpaid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);