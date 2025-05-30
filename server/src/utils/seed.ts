import { PrismaClient, ShiftStatus, RequestStatus, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  console.log('🌱 Resetting and seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Clear DB
  await prisma.shiftRequest.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Alice Admin',
      role: Role.ADMIN,
      password: hashedPassword,
    },
  });

  const nurse1 = await prisma.user.create({
    data: {
      email: 'nancy@example.com',
      name: 'Nancy Nurse',
      role: Role.NURSE,
      password: hashedPassword,
    },
  });

  const nurse2 = await prisma.user.create({
    data: {
      email: 'ned@example.com',
      name: 'Ned Nurse',
      role: Role.NURSE,
      password: hashedPassword,
    },
  });

  const now = new Date();

  // Availability for Nurse1
  const availabilityDates = [0, 1, 2, 3, 4, 5].map((d) => ({
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + d).toISOString().split('T')[0],
    isAvailable: d % 2 === 0,
    userId: nurse1.id,
  }));

  await prisma.availability.createMany({ data: availabilityDates });

  // Confirmed Shifts
  await prisma.shift.createMany({
    data: [
      {
        title: 'Day Shift - ER',
        start: new Date(now.getTime() + 86400000 * 1),
        end: new Date(now.getTime() + 86400000 * 1 + 8 * 3600000),
        status: ShiftStatus.CONFIRMED,
        assignedToId: nurse1.id,
        createdById: admin.id,
      },
      {
        title: 'Night Shift - ICU',
        start: new Date(now.getTime() + 86400000 * 2),
        end: new Date(now.getTime() + 86400000 * 2 + 8 * 3600000),
        status: ShiftStatus.CONFIRMED,
        assignedToId: nurse1.id,
        createdById: admin.id,
      },
    ],
  });

  // Open Shift with PENDING request
  const pendingShift = await prisma.shift.create({
    data: {
      title: 'Float Pool - AM',
      start: new Date(now.getTime() + 86400000 * 3),
      end: new Date(now.getTime() + 86400000 * 3 + 8 * 3600000),
      status: ShiftStatus.OPEN,
      createdById: admin.id,
    },
  });

  const pendingRequest = await prisma.shiftRequest.create({
    data: {
      requesterId: nurse1.id,
      shiftId: pendingShift.id,
      status: RequestStatus.PENDING,
    },
  });

  // Approved Shift and request
  const approvedShift = await prisma.shift.create({
    data: {
      title: 'Float Pool - PM',
      start: new Date(now.getTime() + 86400000 * 4),
      end: new Date(now.getTime() + 86400000 * 4 + 8 * 3600000),
      status: ShiftStatus.APPROVED,
      assignedToId: nurse1.id,
      createdById: admin.id,
    },
  });

  await prisma.shiftRequest.create({
    data: {
      requesterId: nurse1.id,
      shiftId: approvedShift.id,
      status: RequestStatus.APPROVED,
    },
  });

  // Open shifts with no requests
  await prisma.shift.createMany({
    data: [
      {
        title: 'General Floor - AM',
        start: new Date(now.getTime() + 86400000 * 5),
        end: new Date(now.getTime() + 86400000 * 5 + 8 * 3600000),
        status: ShiftStatus.OPEN,
        createdById: admin.id,
      },
      {
        title: 'Medical ICU - AM',
        start: new Date(now.getTime() + 86400000 * 6),
        end: new Date(now.getTime() + 86400000 * 6 + 8 * 3600000),
        status: ShiftStatus.OPEN,
        createdById: admin.id,
      },
    ],
  });

  // Cancelled Request Example
  const cancelledShift = await prisma.shift.create({
    data: {
      title: 'Peds Unit - Night',
      start: new Date(now.getTime() + 86400000 * 7),
      end: new Date(now.getTime() + 86400000 * 7 + 8 * 3600000),
      status: ShiftStatus.OPEN,
      createdById: admin.id,
    },
  });

  await prisma.shiftRequest.create({
    data: {
      requesterId: nurse2.id,
      shiftId: cancelledShift.id,
      status: RequestStatus.CANCELLED,
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
