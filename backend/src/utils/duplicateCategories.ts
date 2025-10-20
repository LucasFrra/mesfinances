import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const duplicateDefaultCategoriesForUser = async (userId: string) => {
  const defaultCategories = await prisma.category.findMany({
    where: { userId: null },
  });

  if (defaultCategories.length === 0) {
    console.warn('No default categories found to duplicate.');
    return;
  }

  const newCategories = defaultCategories.map((cat) => ({
    name: cat.name,
    color: cat.color,
    icon: cat.icon,
    type: cat.type,
    userId,
  }));

  await prisma.category.createMany({ data: newCategories });
  console.log(`${newCategories.length} default categories duplicated for ${userId}`);
};
