import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMonthlyStatsCore = async (userId: string, month: number, year: number) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const expenses = await prisma.expense.groupBy({
    by: ['categoryId'],
    _sum: { amount: true },
    where: { userId, date: { gte: start, lte: end }, showInStats: true },
  });

  const incomes = await prisma.income.groupBy({
    by: ['categoryId'],
    _sum: { amount: true },
    where: { userId, date: { gte: start, lte: end }, showInStats: true },
  });

  const allCategories = await prisma.category.findMany({
    where: {
      id: {
        in: [...expenses.map((e) => e.categoryId), ...incomes.map((i) => i.categoryId)],
      },
    },
  });

  const expenseByCategory = expenses.map((e) => ({
    categoryId: e.categoryId,
    categoryName: allCategories.find((c) => c.id === e.categoryId)?.name ?? 'Inconnue',
    total: e._sum.amount ?? 0,
  }));

  const incomeByCategory = incomes.map((i) => ({
    categoryId: i.categoryId,
    categoryName: allCategories.find((c) => c.id === i.categoryId)?.name ?? 'Inconnue',
    total: i._sum.amount ?? 0,
  }));

  const totalExpense = expenseByCategory.reduce((acc, c) => acc + c.total, 0);
  const totalIncome = incomeByCategory.reduce((acc, c) => acc + c.total, 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    incomeByCategory,
    expenseByCategory,
  };
};
