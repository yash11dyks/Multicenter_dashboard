const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const site = await prisma.siteMaster.create({
    data: {
      siteName: 'AIIMS Delhi',
      piName: 'Dr. Mattu',
      irbApprovalNo: 'IEC-2026-001',
    },
  });
  console.log('Created site:', site);
}

main().finally(() => prisma.$disconnect());