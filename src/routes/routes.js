const express = require('express');
const accountController = require('../controllers/accountController');
const ticketsController = require('../controllers/ticketsController');

const router = express.Router();

// Account Routes
router.get('/accounts/:id', accountController.getAccountDetails); // Fetch account details by ID
router.post('/accounts', accountController.createAccount); // Create a new account
router.put('/accounts/:id', accountController.updateAccount); // Update account by ID
router.delete('/accounts/:id', accountController.deleteAccount); // Delete account by ID
router.get('/accounts/search/:username', accountController.searchAccount); // Search for an account by name

//authenticate account route
router.post('/accounts/authenticate', accountController.authenticateAccount); // Authenticate an account

// Tickets Routes
router.get('/tickets', ticketsController.getAllTickets); // Fetch all tickets
router.get('/tickets/:id', ticketsController.getTicketById); // Fetch ticket by ID
router.post('/tickets', ticketsController.createTicket); // Create a new ticket
router.put('/tickets/:id', ticketsController.updateTicket); // Update ticket by ID
router.delete('/tickets/:id', ticketsController.deleteTicket); // Delete ticket by ID

module.exports = router;