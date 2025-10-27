/* eslint-disable react-hooks/rules-of-hooks */
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expenses";
import { useState, useEffect, useContext } from "react";
import ExpenseReset from "../components/ExpenseReset";
import { PageContext } from "../App";
const host = import.meta.env.VITE_API_URL;

const List = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const { setCurrentPage } = useContext(PageContext);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${host}/api/expenses`);
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };
        fetchExpenses();
    }, []);

    const refresh = async () => {
        const res = await fetch(`${host}/api/expenses`);
        return await res.json();
    };

    const handleReset = async () => {
        const res = await fetch(`${host}/api/expenses/reset`, {
            method: "POST",
        });
        if (!res.ok) throw new Error("Reset failed");
        await refresh();
        const data = await fetch(`${host}/api/expenses`).then((r) => r.json());
        setExpenses(data);
    };

    return (
        <>
        <button onClick={() => setCurrentPage("Welcome")} style={{ position: "absolute", top: 10, left: 10 }}>Back to Welcome</button>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} item={expense} />
            ))}
            <ExpenseReset handleReset={handleReset} />
        </>
    );
};

export default List;