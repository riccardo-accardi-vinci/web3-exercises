import { useForm, type SubmitHandler } from "react-hook-form";
import type { Expense, ExpenseInput } from "../types/Expenses";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

type ExpenseAddProps = {
  onSubmit: (expense: Omit<Expense, "id">) => void | Promise<void>;
};

function ExpenseAdd({ onSubmit }: ExpenseAddProps) {
  const methods = useForm<ExpenseInput>();

  const submitHandler: SubmitHandler<ExpenseInput> = async (data) => {
    const { payer, date, description, amount } = data;
    const payload: Omit<Expense, "id"> = {
      payer,
      description,
      amount,
      ...(date ? { date: new Date(date).toISOString() } : {}),
    } as Omit<Expense, "id">;
    await onSubmit(payload);
    methods.reset();
  };

  return (
     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)} className="space-y-4 p-4">
        <FormField
          name="payer"
          control={methods.control}
          rules={{ required: "Payer is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select payer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alice">Alice</SelectItem>
                            <SelectItem value="Bob">Bob</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      </FormItem>
          )}
        />
         
        <FormField
          name="date"
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value ? field.value.split("T")[0] : ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={methods.control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Description"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={methods.control}
          rules={{ required: "Amount is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
      </div>

  );
}

export default ExpenseAdd;