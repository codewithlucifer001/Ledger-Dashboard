const TimeEntry = require('../models/TimeEntry');

exports.getTimeEntries = async (req, res) => {
  try {
    const userId = req.user?.id || 'demo_user_123';
    const entries = await TimeEntry.find({ userId }).populate('clientId').sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logTime = async (req, res) => {
  try {
    const { clientId, description, durationInSeconds, hourlyRate } = req.body;
    const userId = req.user?.id || 'demo_user_123';

    const newEntry = new TimeEntry({
      userId,
      clientId: clientId || null,
      description: description || 'Tracked Session',
      durationInSeconds,
      hourlyRate: hourlyRate || 50
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};