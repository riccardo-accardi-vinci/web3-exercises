export interface Expense {
  id: number;
  date: string;
  description: string;
  payer: string;
  amount: number;
}

export interface ExpenseInput {
  payer: "Alice" | "Bob";
  date?: string; 
  description: string;
  amount: number;
};

