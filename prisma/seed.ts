// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Cleanup existing
  await prisma.shiftRequest.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Alice Admin',
      role: 'ADMIN',
      password: 'password123' // 🔐 hash in production
    }
  });

  const nurse = await prisma.user.create({
    data: {
      email: 'nancy@example.com',
      name: 'Nancy Nurse',
      role: 'NURSE',
      password: 'password123'
    }
  });

  // Shifts — created individually to capture IDs and include createdById
  const now = new Date();

  const shift1 = await prisma.shift.create({
    data: {
      title: 'Day Shift - ER',
      start: new Date(now.getTime() + 86400000 * 1),
      end: new Date(now.getTime() + 86400000 * 1 + 8 * 3600000),
      status: 'CONFIRMED',
      assignedToId: nurse.id,
      createdById: admin.id
    }
  });

  const shift2 = await prisma.shift.create({
    data: {
      title: 'Night Shift - ICU',
      start: new Date(now.getTime() + 86400000 * 2),
      end: new Date(now.getTime() + 86400000 * 2 + 8 * 3600000),
      status: 'CONFIRMED',
      assignedToId: nurse.id,
      createdById: admin.id
    }
  });

  const shift3 = await prisma.shift.create({
    data: {
      title: 'Float Pool - AM',
      start: new Date(now.getTime() + 86400000 * 3),
      end: new Date(now.getTime() + 86400000 * 3 + 8 * 3600000),
      status: 'OPEN',
      createdById: admin.id
    }
  });

  const shift4 = await prisma.shift.create({
    data: {
      title: 'Float Pool - PM',
      start: new Date(now.getTime() + 86400000 * 4),
      end: new Date(now.getTime() + 86400000 * 4 + 8 * 3600000),
      status: 'OPEN',
      createdById: admin.id
    }
  });

  // Shift Requests
  await prisma.shiftRequest.createMany({
    data: [
      {
        requesterId: nurse.id,
        shiftId: shift3.id,
        status: 'PENDING'
      },
      {
        requesterId: nurse.id,
        shiftId: shift4.id,
        status: 'CONFIRMED'
      }
    ]
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
