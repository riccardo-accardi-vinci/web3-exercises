import React from 'react';
import type { Expense } from '../types/Expenses';

const ExpenseItem: React.FC<{ item: Expense }> = ({ item }) => {
    return (
        <div>
            <h2>{item.description}</h2>
            <p>Date: {item.date}</p>
            <p>Payer: {item.payer}</p>
            <p>Amount: {item.amount}</p>
        </div>
    );
};

export default ExpenseItem;