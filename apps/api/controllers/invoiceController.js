const Invoice = require('../models/Invoice');
const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

exports.getInvoices = async (req, res) => {
  try {
    const userId = req.user?.id || 'demo_user_123';
    const invoices = await Invoice.find({ userId }).populate('clientId').sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const { clientId, invoiceNumber, dueDate, items } = req.body;
    const userId = req.user?.id || 'demo_user_123';

    const totalAmount = items.reduce((sum, item) => sum + (Number(item.hoursOrQty) * Number(item.unitPrice)), 0);

    const invoice = new Invoice({
      userId,
      clientId,
      invoiceNumber,
      dueDate,
      items,
      totalAmount,
      status: 'unpaid'
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Create Invoice Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('clientId');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('clientId');

    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Live Resend Email Delivery
exports.sendReminder = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('clientId');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const clientEmail = invoice.clientId?.email;
    if (!clientEmail) {
      return res.status(400).json({ message: 'Client email not found.' });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
      to: [clientEmail],
      subject: `Payment Reminder: Invoice ${invoice.invoiceNumber}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #1a1a1a; max-width: 500px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #2e7d32;">Payment Reminder</h2>
          <p>Hi <strong>${invoice.clientId?.name || 'Client'}</strong>,</p>
          <p>This is a friendly reminder that payment for invoice <strong>${invoice.invoiceNumber}</strong> ($${(invoice.totalAmount || 0).toFixed(2)}) is currently pending.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">Sent automatically via Ledger Ops.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({ message: 'Resend delivery error: ' + error.message });
    }

    res.json({ 
      message: `Live email delivered to ${clientEmail}!`,
      emailId: data.id 
    });
  } catch (error) {
    console.error('Server Email Error:', error);
    res.status(500).json({ message: 'Failed to send email: ' + error.message });
  }
};