import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const test = await prisma.test.create({
    data: { name: 'Hello DB' },
  });

  console.log('✅ Test record created:', test);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
