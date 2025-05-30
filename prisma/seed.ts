import { PrismaClient } from '@prisma/client';
import { addDays, startOfDay, addHours } from 'date-fns';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const NUM_DAYS = 30;

async function main() {
  console.log('🌱 Seeding database...');

  // Cleanup
  await prisma.shiftSwap.deleteMany();
  await prisma.shiftRequest.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedNursePassword = await bcrypt.hash('nurse123', 10);

  // Seed users
  const [admin, nurse1, nurse2, nurse3] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Admin',
        email: 'admin@nursepro.com',
        password: hashedAdminPassword,
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Nancy Nurse',
        email: 'nancy@nursepro.com',
        password: hashedNursePassword,
        role: 'NURSE',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Nick Nurse',
        email: 'nick@nursepro.com',
        password: hashedNursePassword,
        role: 'NURSE',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Nora Nurse',
        email: 'nora@nursepro.com',
        password: hashedNursePassword,
        role: 'NURSE',
      },
    }),
  ]);

  const nurses = [nurse1, nurse2, nurse3];
  const allShifts = [];
  const openShifts: typeof prisma.shift[] = [];

  // Define shifts with explicit typing to ensure startHour and endHour are numbers
  const shiftConfigs: [string, number, number, string][] = [
    ['Morning Shift', 8, 16, 'General patient care'],
    ['Evening Shift', 16, 24, 'Ward supervision'],
    ['Night Shift', 0, 8, 'Overnight emergency response'],
  ];

  // Generate 3 shifts per day for 30 days
  for (let day = 0; day < NUM_DAYS; day++) {
    const baseDate = startOfDay(addDays(new Date(), day));

    for (const shiftConfig of shiftConfigs) {
      const [title, startHour, endHour, description] = shiftConfig;
      const isForcedOpen = openShifts.length < 10;
      const assignedToId = isForcedOpen ? null : Math.random() < 0.7 ? randomNurse(nurses).id : null;

      const shift = await prisma.shift.create({
        data: {
          title,
          description,
          start: addHours(baseDate, startHour),
          end: addHours(baseDate, endHour),
          createdById: admin.id,
          status: getRandomShiftStatus(),
          assignedToId,
        },
      });

      allShifts.push(shift);
      if (!assignedToId && openShifts.length < 10) {
        openShifts.push(shift);
      }
    }
  }

  // Seed availability
  for (const nurse of nurses) {
    for (let i = 0; i < NUM_DAYS; i++) {
      const date = addDays(new Date(), i);
      await prisma.availability.create({
        data: {
          userId: nurse.id,
          date,
          isAvailable: Math.random() > 0.3,
        },
      });
    }
  }

  // Create shift requests
  let shiftRequestCount = 0;
  for (const shift of openShifts) {
    const requesters = nurses.slice().sort(() => Math.random() - 0.5).slice(0, 2);

    await prisma.shiftRequest.create({
      data: {
        shiftId: shift.id,
        requesterId: requesters[0].id,
        status: 'PENDING',
      },
    });
    console.log(`Created PENDING request: shift ${shift.id}, requester ${requesters[0].name}`);

    await prisma.shiftRequest.create({
      data: {
        shiftId: shift.id,
        requesterId: requesters[1].id,
        status: Math.random() > 0.5 ? 'APPROVED' : 'REJECTED',
      },
    });

    shiftRequestCount++;
  }

  // Create a shift swap if possible
  const confirmedShifts = allShifts.filter((s) => s.assignedToId && s.status === 'CONFIRMED');
  if (confirmedShifts.length >= 2) {
    await prisma.shiftSwap.create({
      data: {
        fromShiftId: confirmedShifts[0].id,
        toShiftId: confirmedShifts[1].id,
        proposerId: confirmedShifts[0].assignedToId!,
        status: 'PENDING',
      },
    });
  }

  console.log('✅ Seeding complete.');
}

function randomNurse(nurses: { id: string }[]) {
  return nurses[Math.floor(Math.random() * nurses.length)];
}

function getRandomShiftStatus(): string {
  const statuses = ['PENDING', 'CONFIRMED', 'APPROVED', 'OPEN'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
