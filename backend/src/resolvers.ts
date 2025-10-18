import { PrismaClient } from '@prisma/client';
import supabase from './supabaseClient';
import { seedDefaultCategories } from './utils/defaultCategories';

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
  },

  Mutation: {
    register: async (parent: unknown, args: AuthArgs) => {
      const { data, error } = await supabase.auth.signUp({
        email: args.email,
        password: args.password,
      });

      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('User creation failed');

      await prisma.user.upsert({
        where: { supabaseId: data.user.id },
        update: { email: data.user.email ?? args.email },
        create: {
          supabaseId: data.user.id,
          email: data.user.email ?? args.email,
        },
      });

      await seedDefaultCategories();

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
  },
};
