const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const connectDB = require('../config/db');

// Route imports
const authRoutes = require('../routes/authRoutes');
const clientRoutes = require('../routes/clientRoutes');
const invoiceRoutes = require('../routes/invoiceRoutes');
const timeRoutes = require('../routes/timeRoutes');
const stripeRoutes = require('../routes/stripeRoutes');
const contractRoutes = require('../routes/contractRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Endpoint Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/time', timeRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/contracts', contractRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Ledger API server is active.' });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}