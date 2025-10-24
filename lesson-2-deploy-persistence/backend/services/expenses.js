
const fs = require('fs');
const path = require('path');
const expensesFilePath = path.join(__dirname, '../data/expenses.json');
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getAllExpenses() {
  try {
    const expenses = await prisma.expense.findMany();
    return expenses;
  } catch (err) {
    throw new Error('Failed to read or parse expenses data');
  }
}

async function addExpense(expense) {
  try {
    const newExpense = await prisma.expense.create({
      data: expense,
    });
    return newExpense;
  } catch (err) {
    throw new Error('Failed to read or parse expenses data');
  }
}

async function resetExpenses(){
  try {
    await prisma.expense.deleteMany({});
    const populate = require('../db-populate');
    await populate.main();
  } catch (err) {
    console.error('resetExpenses failed:', err);
    throw err;
  }
}

module.exports = {
    getAllExpenses,
    addExpense,
    resetExpenses
};
