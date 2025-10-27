// Create Expenses DB populate utility (exported for API use)
/* model Expense {
  id          Int      @id @default(autoincrement())
  date        DateTime @default(now())
  description String
  payer       String
  amount      Float
} */
const { PrismaClient } = require("./generated/prisma");

// Exported function to be called from routes/services. Do NOT auto-run or exit process.
async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.expense.createMany({
      data: [
        { description: "Groceries", payer: "Alice", amount: 150.75 },
        { description: "Electricity Bill", payer: "Bob", amount: 60.5 },
        { description: "Internet Subscription", payer: "Charlie", amount: 45.0 },
        { description: "Dining Out", payer: "Alice", amount: 80.2 },
        { description: "Gasoline", payer: "Bob", amount: 40.0 },
      ],
    });
    console.log("Database has been populated with sample expenses.");
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { main };