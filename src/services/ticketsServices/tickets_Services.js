const mongoose = require('mongoose');
const Ticket = require('../../schemas/ticketsSchemas/ticketsSchemas'); // Adjust the path as necessary


// CRUD Methods

// Create a new ticket
const createTicket = async (ticketData) => {
    try {
        const ticket = new Ticket(ticketData);
        return await ticket.save();
    } catch (error) {
        throw new Error(`Error creating ticket: ${error.message}`);
    }
};

// Get all tickets
const getAllTickets = async () => {
    try {
        return await Ticket.find();
    } catch (error) {
        throw new Error(`Error fetching tickets: ${error.message}`);
    }
};

// Get a ticket by ID
const getTicketById = async (id) => {
    try {
        return await Ticket.findById(id);
    } catch (error) {
        throw new Error(`Error fetching ticket by ID: ${error.message}`);
    }
};

// Update a ticket by ID
const updateTicketById = async (id, updateData) => {
    try {
        return await Ticket.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error updating ticket: ${error.message}`);
    }
};

// Delete a ticket by ID
const deleteTicketById = async (id) => {
    try {
        return await Ticket.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting ticket: ${error.message}`);
    }
};

// Search for a unique ticket
const searchUniqueTicket = async (query) => {
    try {
        return await Ticket.findOne(query);
    } catch (error) {
        throw new Error(`Error searching for unique ticket: ${error.message}`);
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,
    searchUniqueTicket,
};