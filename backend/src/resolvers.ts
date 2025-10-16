import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

type RegisterArgs = {
  email: string;
  password: string;
};

export const resolvers = {
  Query: {
    ping: () => 'pong',
  },

  Mutation: {
    register: async (parent: unknown, args: RegisterArgs) => {
      // check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email: args.email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // hash password
      const hashedPassword = await bcrypt.hash(args.password, 10);

      // create new user
      const user = await prisma.user.create({
        data: { email: args.email, password: hashedPassword },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      return { token, user };
    },
    login: async (parent: unknown, args: RegisterArgs) => {
      const user = await prisma.user.findUnique({ where: { email: args.email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      return { token, user };
    },
  },
};
