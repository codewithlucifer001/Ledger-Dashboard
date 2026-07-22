import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
}

// Import all API routes
import authRoutes from '../routes/authRoutes.js';
import clientRoutes from '../routes/clientRoutes.js';
import invoiceRoutes from '../routes/invoiceRoutes.js';
import timeRoutes from '../routes/timeRoutes.js';
import contractRoutes from '../routes/contractRoutes.js';
import stripeRoutes from '../routes/stripeRoutes.js';

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/time', timeRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/stripe', stripeRoutes);

// Root healthcheck endpoint
app.get('/api', (req, res) => {
  res.json({ status: 'API is running' });
});

// Standalone server listener for local development only
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export Express app instance for Vercel Serverless Functions
export default app;