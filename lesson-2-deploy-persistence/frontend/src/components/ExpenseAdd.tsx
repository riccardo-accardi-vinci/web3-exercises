import React from 'react';
import type { Expense } from '../types/Expenses';

const ExpenseAdd: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
    const onAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const payers = ['Alice', 'Bob'];
        const newExpense: Expense = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            description: 'New Expense',
            payer: payers[Math.floor(Math.random() * payers.length)],
            amount: parseFloat((Math.random() * 100).toFixed(2)),
        };

        const res = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });
    if (!res.ok) throw new Error("POST failed");
    onCreated();
  };
  return <form onSubmit={onAdd}><button type="submit">Add</button></form>;
};

export default ExpenseAdd;
