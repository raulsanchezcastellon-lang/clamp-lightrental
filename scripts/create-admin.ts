import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// Uso: npx tsx scripts/create-admin.ts <email> <contraseña> [nombre]
// La contraseña nunca va escrita en el código: el repositorio es público.
const [email, password, name = "Admin"] = process.argv.slice(2);

if (!email || !password || password.length < 12) {
  console.error("Uso: npx tsx scripts/create-admin.ts <email> <contraseña (mín. 12 caracteres)> [nombre]");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      name,
    },
    select: { id: true, email: true, name: true },
  });

  console.log("Administrador creado:", admin);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
