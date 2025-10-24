
const fs = require('fs');
const path = require('path');
const expensesFilePath = path.join(__dirname, '../data/expenses.json');

function getAllExpenses() {
  try {
    const data = fs.readFileSync(expensesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Failed to read or parse expenses data');
  }
}

function addExpense(expense) {
  try {
    const data = fs.readFileSync(expensesFilePath, 'utf8');
    const expenses = JSON.parse(data);
    expenses.push(expense);
    fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2));
    return expense;
  } catch (err) {
    throw new Error('Failed to read/write expenses data');
  }
}

function resetExpenses() {
    try {
        const initialData = fs.readFileSync(path.join(__dirname, '../data/expenses.init.json'), 'utf8');
        fs.writeFileSync(expensesFilePath, initialData);
        return JSON.parse(initialData);
    } catch (err) {
       throw new Error('Failed to reset expenses data');
    }
}

module.exports = {
    getAllExpenses,
    addExpense,
    resetExpenses
};
