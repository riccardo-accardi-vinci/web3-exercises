
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expensesFilePath = path.join(__dirname, '../data/expenses.json');
const service = require('../services/expenses');

router.get('/expenses', async (req, res) => {
    try {
        const expenses = await service.getAllExpenses();
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to retrieve expenses data' });
    }
});

router.post('/expenses', async (req, res) => {
    try {
        const newExpense = await service.addExpense(req.body);
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ error: err.message || 'Failed to create expense' });
    }
});

router.post('/expenses/reset', async (req, res) => {
    try {
        await service.resetExpenses();
        res.status(200).json({ message: 'Expenses data has been reset' });
    } catch (err) {
        console.error('Error in POST /expenses/reset:', err);
        res.status(500).json({ error: err && err.message ? err.message : 'Failed to reset expenses data' });
    }
});

module.exports = router;