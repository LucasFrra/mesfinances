import { PrismaClient, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

export const defaultCategories = [
  // Expenses
  { name: 'Alimentation', color: '#FFB6B6', icon: '🥪', type: CategoryType.EXPENSE },
  { name: 'Logement', color: '#A3CEF1', icon: '🏠', type: CategoryType.EXPENSE },
  { name: 'Transport', color: '#FDD85D', icon: '🚗', type: CategoryType.EXPENSE },
  { name: 'Loisirs', color: '#E6B6FF', icon: '🎮', type: CategoryType.EXPENSE },
  { name: 'Santé', color: '#FFDAAF', icon: '💊', type: CategoryType.EXPENSE },

  // Incomes
  { name: 'Salaire', color: '#9FE6A0', icon: '💰', type: CategoryType.INCOME },
  { name: 'Prime', color: '#F4A261', icon: '🎁', type: CategoryType.INCOME },
  { name: 'Autre', color: '#B0B0B0', icon: '✨', type: CategoryType.INCOME },
];

// Création automatique des catégories globales
export const seedDefaultCategories = async () => {
  const existing = await prisma.category.findMany({ where: { userId: null } });

  if (existing.length === 0) {
    await prisma.category.createMany({ data: defaultCategories });
    console.log('Default categories created');
  } else {
    console.log('Default categories already exist');
  }
};
