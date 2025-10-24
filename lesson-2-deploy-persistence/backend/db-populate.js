//Create Expansesion DB Populate Script
/*model Expense {
  id          Int      @id @default(autoincrement())
  date        DateTime @default(now())
  description String
  payer       String
  amount      Float
}*/
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
async function main() {
  await prisma.expense.createMany({
    data: [
        {description: "Groceries", payer: "Alice", amount: 150.75},
        {description: "Electricity Bill", payer: "Bob", amount: 60.50},
        {description: "Internet Subscription", payer: "Charlie", amount: 45.00},
        {description: "Dining Out", payer: "Alice", amount: 80.20},
        {description: "Gasoline", payer: "Bob", amount: 40.00}
    ],
  });
  console.log("Database has been populated with sample expenses.");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });