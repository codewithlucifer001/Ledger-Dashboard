const Client = require('../models/Client');

// Get all clients for the logged-in freelancer
exports.getClients = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 'demo_user_123';
    const clients = await Client.find({ userId }).sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, company, email, phone, address, notes } = req.body;
    
    // Uses logged-in user ID if available, otherwise falls back to demo ID
    const userId = req.user?.id || 'demo_user_123';

    const client = new Client({
      userId,
      name,
      company,
      email,
      phone,
      address,
      notes
    });

    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error('Create Client Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const userId = req.user?.id || 'demo_user_123';
    const client = await Client.findOneAndDelete({ _id: req.params.id, userId });
    if (!client) {
      return res.status(404).json({ message: 'Client not found.' });
    }
    res.json({ message: 'Client removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};