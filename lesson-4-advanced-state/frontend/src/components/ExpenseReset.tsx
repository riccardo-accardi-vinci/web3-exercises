import React from 'react';
import { toast } from "react-toastify";
import { Button } from './ui/button';

const ExpenseReset: React.FC<{ handleReset: () => void }> = ({ handleReset }) => {
    const onReset = async (e: React.FormEvent) => {
        e.preventDefault();
        handleReset();
        toast.success("Expenses have been reset");
    };

    return (
        <form onSubmit={onReset}>
            <Button type="submit">Reset</Button>
        </form>
    );
};
export default ExpenseReset;

