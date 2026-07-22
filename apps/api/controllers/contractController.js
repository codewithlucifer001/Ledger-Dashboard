const Contract = require('../models/Contract');

exports.getContracts = async (req, res) => {
  try {
    const userId = req.user?.id || 'demo_user_123';
    const contracts = await Contract.find({ userId }).populate('clientId').sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createContract = async (req, res) => {
  try {
    const { clientId, title, content } = req.body;
    const userId = req.user?.id || 'demo_user_123';

    const contract = new Contract({ userId, clientId, title, content });
    await contract.save();
    res.status(201).json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signContract = async (req, res) => {
  try {
    const { signatureData } = req.body;
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      { signatureData, status: 'signed' },
      { new: true }
    ).populate('clientId');

    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
