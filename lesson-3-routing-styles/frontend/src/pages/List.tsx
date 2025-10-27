import type { Expense } from "../types/Expenses";
import { useState, useEffect } from "react";
import ExpenseReset from "../components/ExpenseReset";
import NavBar from "../components/NavBar";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import ExpenseItem from "@/components/ExpenseItem";

const host = import.meta.env.VITE_API_URL;

const List = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

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
            <div className="mx-auto centered-container">
                <NavBar />

                 <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Id</TableHead>
                <TableHead className="text-left">Date</TableHead>
                <TableHead className="text-left">Description</TableHead>
                <TableHead className="text-left">Payer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense: Expense) => (
                <ExpenseItem key={expense.id} item={expense} />
              ))}
            </TableBody>
          </Table>
                <div className="mt-4">
                    <ExpenseReset handleReset={handleReset} />
                </div>
            </div>
        </>
    );
};

export default List;