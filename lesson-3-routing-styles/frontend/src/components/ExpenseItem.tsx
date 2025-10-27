import React from 'react';
import type { Expense } from '../types/Expenses';
import { TableCell, TableRow } from './ui/table';

const ExpenseItem: React.FC<{ item: Expense }> = ({ item }) => {
    return (
        <TableRow>
      <TableCell className="text-left">#{item.id}</TableCell>
      <TableCell className="text-left">{item.date.split('T')[0]}</TableCell>
      <TableCell className="text-left">{item.description}</TableCell>
      <TableCell className="text-left">
        Paid by <span>{item.payer}</span>
      </TableCell>
      <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
    </TableRow>
  );
};

export default ExpenseItem;