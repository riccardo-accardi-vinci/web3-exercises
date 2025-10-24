import React from 'react';
import { toast } from "react-toastify";

const ExpenseReset: React.FC<{ handleReset: () => void }> = ({ handleReset }) => {
    const onReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/expenses/reset', {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            handleReset();
            //Provides user feedback for the reset operation
            toast.success("Expenses have been reset");
        } catch (error) {
            console.error('Error resetting expenses:', error);
            toast.error("Failed to reset expenses");
        }
    };

    return (
        <form onSubmit={onReset}>
            <button type="submit">Reset</button>
        </form>
    );
};

export default ExpenseReset;
