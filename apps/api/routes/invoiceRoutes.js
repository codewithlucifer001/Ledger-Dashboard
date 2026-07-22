const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getInvoices, 
  createInvoice, 
  getInvoiceById, 
  updateInvoiceStatus,
  sendReminder 
} = require('../controllers/invoiceController');

// Apply auth middleware to protect routes
router.get('/', auth, getInvoices);
router.post('/', auth, createInvoice);
router.get('/:id', auth, getInvoiceById);
router.patch('/:id/status', auth, updateInvoiceStatus);
router.post('/:id/reminder', auth, sendReminder);

module.exports = router;