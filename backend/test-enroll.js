const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const participant = await prisma.participant.create({
    data: {
      siteId: 'a9b8eaa9-3bcf-4037-acaa-00c217999a8b',
      consentStatus: 'consented',
    },
  });
  console.log('Created participant:', participant);
}

main().finally(() => prisma.$disconnect());