const mongoose = require('mongoose');
const Account = require('../../schemas/accountsSchema/accountSchema'); // Adjust the path as necessary

// Create a new account
const createAccount = async (accountData) => {
    try {
        const account = new Account(accountData);
        return await account.save();
    } catch (error) {
        throw new Error(`Error creating account: ${error.message}`);
    }
};

// Get all accounts
const getAllAccounts = async () => {
    try {
        return await Account.find();
    } catch (error) {
        throw new Error(`Error fetching accounts: ${error.message}`);
    }
};

// Get a single account by ID
const getAccountById = async (id) => {
    try {
        return await Account.findById(id);
    } catch (error) {
        throw new Error(`Error fetching account by ID: ${error.message}`);
    }
};

// Update an account by ID
const updateAccountById = async (id, updateData) => {
    try {
        if (updateData.password) {
            // Hash the new password before updating
            const account = new Account();
            updateData.password = await account.hashPassword(updateData.password);
        }
        return await Account.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error updating account: ${error.message}`);
    }
};

// Delete an account by ID
const deleteAccountById = async (id) => {
    try {
        return await Account.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting account: ${error.message}`);
    }
};

// Search for a unique account by a specific field
const searchUniqueAccount = async (field, value) => {
    try {
        const query = {};
        query[field] = { $regex: value, $options: 'i' }; // 'i' = case-insensitive
        return await Account.findOne(query);
    } catch (error) {
        throw new Error(`Error searching for unique account: ${error.message}`);
    }
};

// Authenticate an account by username/email and password
const authenticateAccount = async (email, password) => {
    try {
        const account = await Account.findOne({ email }).select('+password'); // Ensure password field is included in the payload

        if (!account) {
            throw new Error('Account not found');
        }

        const isPasswordValid = await account.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Return the complete payload of the account
        return await Account.findById(account._id);
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
};

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccountById,
    deleteAccountById,
    searchUniqueAccount,
    authenticateAccount,
};