import e from 'cors';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function findAll() {
  return prisma.transfer.findMany();
}

export async function createTransfer({
  amount,
  date,
    sourceId,
    targetId,
}: {
  amount: number;
  date: Date;
  sourceId: number;
  targetId: number;
}) {
  return prisma.transfer.create({
    data: {
      amount,
      date,
      source: { connect: { id: sourceId } },
      target: { connect: { id: targetId } },
    },
  });
}