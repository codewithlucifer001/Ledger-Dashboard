const mongoose = require('mongoose');

const TimeLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    projectName: { type: String, required: true },
    description: { type: String, default: '' },
    durationInSeconds: { type: Number, required: true, default: 0 },
    isBilled: { type: Boolean, default: false },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TimeLog', TimeLogSchema);