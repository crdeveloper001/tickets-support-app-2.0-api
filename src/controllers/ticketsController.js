const ticketsService = require('../services/ticketsServices/tickets_Services');

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await ticketsService.getTicketById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTicket = async (req, res) => {
    try {
        const ticketData = req.body;
        const newTicket = await ticketsService.createTicket(ticketData);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticketData = req.body;
        const updatedTicket = await ticketsService.updateTicketById(ticketId, ticketData);
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const deleted = await ticketsService.deleteTicketById(ticketId);
        if (!deleted) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
};