import { PrismaClient } from '@prisma/client';
import supabase from './supabaseClient';
import { seedDefaultCategories } from './utils/defaultCategories';
import { expenseSchema } from './validation/expenseSchema';
import { duplicateDefaultCategoriesForUser } from './utils/duplicateCategories';

const prisma = new PrismaClient();

type AuthArgs = {
  email: string;
  password: string;
};

export const resolvers = {
  Query: {
    ping: () => 'pong',

    me: async (_: unknown, __: unknown, context: any) => {
      return context.user;
    },

    getExpenses: async (_: unknown, __: unknown, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      return prisma.expense.findMany({
        where: { userId: context.user.id },
        include: { category: true },
        orderBy: { date: 'desc' },
      });
    },
  },

  Mutation: {
    register: async (parent: unknown, args: AuthArgs) => {
      const { data, error } = await supabase.auth.signUp({
        email: args.email,
        password: args.password,
      });

      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('User creation failed');

      await seedDefaultCategories();

      await prisma.user.upsert({
        where: { supabaseId: data.user.id },
        update: { email: data.user.email ?? args.email },
        create: {
          supabaseId: data.user.id,
          email: data.user.email ?? args.email,
        },
      });

      await duplicateDefaultCategoriesForUser(data.user.id);

      return data;
    },

    login: async (parent: unknown, args: AuthArgs) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: args.email,
        password: args.password,
      });

      if (error) throw new Error(error.message);
      return data;
    },

    addExpense: async (_: unknown, args: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      const parsed = expenseSchema.safeParse(args);
      if (!parsed.success) {
        const message = parsed.error.issues.map((i) => i.message).join(', ');
        throw new Error(`Invalid input: ${message}`);
      }

      const expense = await prisma.expense.create({
        data: {
          ...parsed.data,
          userId: context.user.id,
        },
        include: { category: true },
      });

      return expense;
    },

    deleteExpense: async (_: unknown, { id }: { id: number }, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      const expense = await prisma.expense.findUnique({ where: { id } });
      if (!expense || expense.userId !== context.user.id) throw new Error('Not authorized');

      await prisma.expense.delete({ where: { id } });
      return true;
    },
  },
};
