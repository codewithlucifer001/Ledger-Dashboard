const express = require('express');
const router = express.Router();
const { getTimeEntries, logTime } = require('../controllers/timeController');

router.get('/', getTimeEntries);
router.post('/', logTime);

module.exports = router;