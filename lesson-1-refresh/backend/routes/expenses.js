
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expensesFilePath = path.join(__dirname, '../data/expenses.json');
const service = require('../services/expenses');

router.get('/expenses', (req, res) => {
    const expenses = service.getAllExpenses();
    if (expenses) {
        res.status(200).json(expenses);
    } else {
        res.status(500).json({ error: 'Failed to retrieve expenses data' });
    }
});

router.post('/expenses', (req, res) => {
    const newExpense = req.body;
    service.addExpense(newExpense);
    res.status(201).json(newExpense);
});

router.post('/expenses/reset', (req, res) => {
    const initialExpenses = [];
    service.resetExpenses(expensesFilePath, initialExpenses);
    res.status(200).json({ message: 'Expenses data has been reset' });
});

module.exports = router;