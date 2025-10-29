import { PrismaClient } from '../../../generated/prisma';

  const prisma = new PrismaClient();

  export async function getAllExpenses() {
    return prisma.expense.findMany({
      include: {
        payer: true,
        participants: true,
      },
    });
  }

  export async function getExpenseById(id: number) {
    return prisma.expense.findUnique({
      where: { id },
      include: {
        payer: true,
        participants: true,
      },
    });
  }

  export async function createExpense({
    description,
    amount,
    date,
    payerId,
    participantIds,
  }: {
    description: string;
    amount: number;
    date: Date;
    payerId: number;
    participantIds: number[];
  }) {

    return prisma.expense.create({
      data: {
        description,
        amount,
        date,
        payer: { connect: { id: payerId } },
        participants: { connect: participantIds.map((id) => ({ id })) },
      },
    });
  }