import { useForm, type SubmitHandler } from "react-hook-form";
import type { Expense, ExpenseInput } from "../types/Expenses";

type ExpenseAddProps = {
  onSubmit: (expense: Omit<Expense, "id">) => void | Promise<void>;
};

function ExpenseAdd({ onSubmit }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseInput>();

  const submitHandler: SubmitHandler<ExpenseInput> = async (data) => {
    const { payer, date, description, amount } = data;
    const payload: Omit<Expense, "id"> = {
      payer,
      description,
      amount,
      ...(date ? { date: new Date(date).toISOString() } : {}),
    } as Omit<Expense, "id">;
    await onSubmit(payload);
    reset();
  };
//Same with the form - make each element on its own line with proper label alignment and that the add button is more visible

  return (
    <form onSubmit={handleSubmit(submitHandler)} className= "flex flex-col space-y-4 p-4">
      <label>
        Payer : 
        <select {...register("payer", { required: true })}>
          <option value="">Select payer</option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>

      <label>
        Date : 
        <input type="date" {...register("date")} />
      </label>
      <br />
      <label>
        Description : 
        <input
          type="text"
          {...register("description", { required: true })}
          placeholder="Description"
        />
      </label>

      <label>
        Amount : 
        <input
          type="number"
          step="0.01"
          {...register("amount", { required: true, valueAsNumber: true })}
          placeholder="Amount"
        />
        {errors.amount && <span>Amount field is required</span>}
      </label>
      <br />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Add</button>
    </form>
  );
}

export default ExpenseAdd;