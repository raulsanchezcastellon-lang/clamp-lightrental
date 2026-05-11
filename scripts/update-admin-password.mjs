import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const [email, newPassword] = process.argv.slice(2);

if (!email || !newPassword) {
  console.error("Usage: npm run admin:password -- <email> <new-password>");
  process.exit(1);
}

if (newPassword.length < 8) {
  console.error("The new password must be at least 8 characters long.");
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const password = await bcrypt.hash(newPassword, 10);
  const admin = await prisma.admin.update({
    where: { email },
    data: { password },
    select: { email: true, name: true, updatedAt: true },
  });

  console.log(`Password updated for ${admin.email}.`);
} catch (error) {
  console.error("Unable to update admin password:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
