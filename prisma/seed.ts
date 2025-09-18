import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const phone = '+8801234567890';
  const username = 'superadmin';
  const password = 'Admin@123'; // you can change this later

  // hash password securely
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {}, // no update, just ensure it exists
    create: {
      email,
      phone,
      username,
      passhash: hashedPassword,
      role: 'ADMIN',
      is_active: true,
    },
  });

  console.log('✅ Default admin created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
