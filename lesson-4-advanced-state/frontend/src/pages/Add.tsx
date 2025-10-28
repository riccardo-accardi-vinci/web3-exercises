/* eslint-disable react-hooks/rules-of-hooks */
import ExpenseAdd from "../components/ExpenseAdd";
import type { Expense } from "../types/Expenses";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const host = import.meta.env.VITE_API_URL;


const Add = () => {
    const navigate = useNavigate();

     const handleSubmit = async (newExpense: Omit<Expense, 'id'>) => {
        console.log('Submitting new expense:', newExpense);
    const res = await fetch(`${host}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });
    if (!res.ok) throw new Error("POST failed");
    navigate('/list');
  };

    return (
        <>
        <NavBar />
        <ExpenseAdd onSubmit={handleSubmit} />
        </>
    )
}

export default Add;