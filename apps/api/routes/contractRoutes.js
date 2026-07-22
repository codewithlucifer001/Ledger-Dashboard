const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getContracts, createContract, signContract } = require('../controllers/contractController');

router.get('/', auth, getContracts);
router.post('/', auth, createContract);
router.patch('/:id/sign', auth, signContract);

module.exports = router;