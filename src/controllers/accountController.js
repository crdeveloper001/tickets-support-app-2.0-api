const accountServices = require('../services/accountsServices/account_Services');

const getAccountDetails = async (req, res) => {
    try {
        const accountId = req.params.id;
        const accountDetails = await accountServices.getAccountById(accountId); // Updated method name
        res.status(200).json(accountDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAccount = async (req, res) => {
    try {
        const accountData = req.body;
        const newAccount = await accountServices.createAccount(accountData);
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const accountData = req.body;
        const updatedAccount = await accountServices.updateAccountById(accountId, accountData); // Updated method name
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        await accountServices.deleteAccountById(accountId); // Updated method name
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const searchAccount = async (req, res) => {
    try {
        const { username } = req.params;  // Obtener el valor directamente de los parámetros de la URL
        const account = await accountServices.searchUniqueAccount('username', username); // Buscar por el campo 'username'

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const authenticateAccount = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from the request body
        const authenticatedAccount = await accountServices.authenticateAccount(email, password);
        res.status(200).json(authenticatedAccount);
    } catch (error) {
        res.status(401).json({ error: error.message }); // Return 401 for authentication failure
    }
};


module.exports = {
    getAccountDetails,
    createAccount,
    updateAccount,
    deleteAccount,
    searchAccount,
    authenticateAccount,
};
