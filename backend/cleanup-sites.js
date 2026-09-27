const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.siteMaster.deleteMany({
    where: { irbApprovalNo: '' },
  });
  console.log('Deleted bad records:', deleted);

  const remaining = await prisma.siteMaster.findMany();
  console.log('Remaining sites:', remaining);
}

main().finally(() => prisma.$disconnect());