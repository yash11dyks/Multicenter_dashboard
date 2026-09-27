const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.siteMaster.deleteMany({});
  console.log('Cleared all SiteMaster records');
}

main().finally(() => prisma.$disconnect());