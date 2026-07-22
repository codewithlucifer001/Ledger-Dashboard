const express = require('express');
const router = express.Router();
const { getClients, createClient, deleteClient } = require('../controllers/clientController');
const auth = require('../middleware/auth');

// Temporarily disabled for local development & testing
// router.use(auth); // Protect all client routes

router.get('/', getClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);

module.exports = router;