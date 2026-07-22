const mongoose = require('mongoose');

const timeEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    default: 'demo_user_123'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false
  },
  description: {
    type: String,
    required: true,
    default: 'General Work'
  },
  durationInSeconds: {
    type: Number,
    required: true
  },
  hourlyRate: {
    type: Number,
    default: 50
  },
  isBilled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('TimeEntry', timeEntrySchema);