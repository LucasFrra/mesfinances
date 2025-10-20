import { PrismaClient } from '@prisma/client';
import supabase from './supabaseClient';
import { seedDefaultCategories } from './utils/defaultCategories';
import { expenseSchema } from './validation/expenseSchema';
import { duplicateDefaultCategoriesForUser } from './utils/duplicateCategories';
import { categorySchema, categoryUpdateSchema } from './validation/categorySchema';

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

    getCategories: async (_: unknown, __: unknown, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      return prisma.category.findMany({
        where: { userId: context.user.id },
        orderBy: { name: 'asc' },
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

    createCategory: async (_: unknown, args: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      const parsed = categorySchema.safeParse(args);
      if (!parsed.success) {
        const msg = parsed.error.issues.map((i) => i.message).join(', ');
        throw new Error(`Invalid input: ${msg}`);
      }

      return prisma.category.create({
        data: { ...parsed.data, userId: context.user.id },
      });
    },

    updateCategory: async (_: unknown, args: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      const parsed = categoryUpdateSchema.safeParse(args);
      if (!parsed.success) {
        const msg = parsed.error.issues.map((i) => i.message).join(', ');
        throw new Error(`Invalid input: ${msg}`);
      }

      const category = await prisma.category.findUnique({ where: { id: args.id } });
      if (!category) throw new Error('Category not found');
      if (category.userId === null) throw new Error('Cannot update global categories');
      if (category.userId !== context.user.id) throw new Error('Not authorized');

      return prisma.category.update({
        where: { id: args.id },
        data: {
          name: args.name ?? category.name,
          color: args.color ?? category.color,
          icon: args.icon ?? category.icon,
        },
      });
    },

    deleteCategory: async (_: unknown, { id }: { id: number }, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) throw new Error('Category not found');
      if (category.userId === null) throw new Error('Cannot delete global categories');
      if (category.userId !== context.user.id) throw new Error('Not authorized');

      await prisma.category.delete({ where: { id } });
      return true;
    },
  },
};
