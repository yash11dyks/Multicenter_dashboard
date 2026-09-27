const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sites = await prisma.siteMaster.findMany();
  console.log(sites);
}

main().finally(() => prisma.$disconnect());