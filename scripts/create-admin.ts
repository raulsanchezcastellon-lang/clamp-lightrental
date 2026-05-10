import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.admin.create({
    data: {
      email: "raul@clamp-lightrental.com",
      password: hashedPassword,
      name: "Raul",
    },
  });

  console.log(admin);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());