import React from 'react';
import ExpenseItem from '../components/ExpenseItem';
import type { Expense } from '../types/Expenses';
import { useState } from 'react';
import ExpenseAdd from '../components/ExpenseAdd';
import ExpenseReset from '../components/ExpenseReset';
const host = import.meta.env.VITE_API_URL;

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

    const handleSubmit = async (newExpense: Omit<Expense, 'id'>) => {
        console.log('Submitting new expense:', newExpense);
    const res = await fetch(`${host}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });
    if (!res.ok) throw new Error("POST failed");
    refresh();
  };

  const handleReset = async () => {
    const res = await fetch(`${host}/api/expenses/reset`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Reset failed");
    refresh();
  }

    return (
        <div>
            <h1>Expense Tracker</h1>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} item={expense} />
            ))}
            <ExpenseAdd onSubmit={handleSubmit} />
            <ExpenseReset handleReset={handleReset} />
        </div>
    );
};

export default Home;
