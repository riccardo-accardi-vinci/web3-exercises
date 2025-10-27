import { useContext } from "react";
import { PageContext } from "../App";
import ExpenseAdd from "../components/ExpenseAdd";
import type { Expense } from "../types/Expenses";
const host = import.meta.env.VITE_API_URL;

const refresh = async () => {
    const res = await fetch(`${host}/api/expenses`);
    return await res.json();
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

const Add = () => {
    const { setCurrentPage } = useContext(PageContext);
    return (
        <>
                <button onClick={() => setCurrentPage("Welcome")} style={{ position: "absolute", top: 10, left: 10 }}>Back to Welcome</button>
                    <ExpenseAdd onSubmit={handleSubmit} />
                    </>
    )
}

export default Add;