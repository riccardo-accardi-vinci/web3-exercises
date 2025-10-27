import React from 'react';
import { toast } from "react-toastify";

const ExpenseReset: React.FC<{ handleReset: () => void }> = ({ handleReset }) => {
    const onReset = async (e: React.FormEvent) => {
        e.preventDefault();
        handleReset();
        toast.success("Expenses have been reset");
    };

    return (
        <form onSubmit={onReset}>
            <button type="submit">Reset</button>
        </form>
    );
};
export default ExpenseReset;

