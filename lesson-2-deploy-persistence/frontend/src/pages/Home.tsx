/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ExpenseItem from '../components/ExpenseItem';
import type { Expense } from '../types/Expenses';
import { useState } from 'react';
import ExpenseAdd from '../components/ExpenseAdd';
import ExpenseReset from '../components/ExpenseReset';
const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';

const Home: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    React.useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${host}/api/expenses`);
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
    }, []);

    const refresh = async () => {
    const res = await fetch(`${host}/api/expenses`);
    setExpenses(await res.json());
  };


    return (
        <div>
            <h1>Expense Tracker</h1>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} item={expense} />
            ))}
            <ExpenseAdd onCreated={refresh} />
            <ExpenseReset handleReset={refresh} />
        </div>
    );
};

export default Home;
