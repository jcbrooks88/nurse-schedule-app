import { PrismaClient, ShiftStatus, RequestStatus, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  console.log('🌱 Resetting and seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Clear the database in order of relationships
  await prisma.shiftRequest.deleteMany();
  console.log('🗑️ Deleted all shift requests');

  await prisma.shift.deleteMany();
  console.log('🗑️ Deleted all shifts');

  await prisma.user.deleteMany();
  console.log('🗑️ Deleted all users');

  // Create users (no need for upsert since we just cleared the DB)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Alice Admin',
      role: Role.ADMIN,
      password: hashedPassword,
    },
  });

  const nurse = await prisma.user.create({
    data: {
      email: 'nancy@example.com',
      name: 'Nancy Nurse',
      role: Role.NURSE,
      password: hashedPassword,
    },
  });

  const now = new Date();

  // Create shifts
  const shift1 = await prisma.shift.create({
    data: {
      title: 'Day Shift - ER',
      start: new Date(now.getTime() + 86400000 * 1),
      end: new Date(now.getTime() + 86400000 * 1 + 8 * 3600000),
      status: ShiftStatus.CONFIRMED,
      assignedToId: nurse.id,
      createdById: admin.id,
    },
  });

  const shift2 = await prisma.shift.create({
    data: {
      title: 'Night Shift - ICU',
      start: new Date(now.getTime() + 86400000 * 2),
      end: new Date(now.getTime() + 86400000 * 2 + 8 * 3600000),
      status: ShiftStatus.CONFIRMED,
      assignedToId: nurse.id,
      createdById: admin.id,
    },
  });

  const shift3 = await prisma.shift.create({
    data: {
      title: 'Float Pool - AM',
      start: new Date(now.getTime() + 86400000 * 3),
      end: new Date(now.getTime() + 86400000 * 3 + 8 * 3600000),
      status: ShiftStatus.OPEN,
      createdById: admin.id,
    },
  });

  const shift4 = await prisma.shift.create({
    data: {
      title: 'Float Pool - PM',
      start: new Date(now.getTime() + 86400000 * 4),
      end: new Date(now.getTime() + 86400000 * 4 + 8 * 3600000),
      status: ShiftStatus.OPEN,
      createdById: admin.id,
    },
  });

  // Create shift requests
  await prisma.shiftRequest.create({
    data: {
      requesterId: nurse.id,
      shiftId: shift3.id,
      status: RequestStatus.PENDING,
    },
  });

  await prisma.shiftRequest.create({
    data: {
      requesterId: nurse.id,
      shiftId: shift4.id,
      status: RequestStatus.CONFIRMED,
    },
  });

  console.log('✅ Seed complete!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Error seeding database:', e);
  prisma.$disconnect();
  process.exit(1);
});
