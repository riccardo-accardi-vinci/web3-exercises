
import ApiClient from '../../lib/api';
import type { Expense } from '@/types/Expense';
import type { LoaderFunctionArgs } from 'react-router';

export interface LoaderData {
  expense: Expense;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const parsedId = Number(id);

  if (!id || Number.isNaN(parsedId)) {
    throw new Response('Expense not found', { status: 404 });
  }

  const expense = await ApiClient.getExpenseById(parsedId);

  if (!expense) {
    throw new Response('Expense not found', { status: 404 });
  }

  return { expense };
}