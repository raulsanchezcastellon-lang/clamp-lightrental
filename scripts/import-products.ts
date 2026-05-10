import { PrismaClient } from "@prisma/client";
import csv from "csv-parser";
import https from "https";
import { Readable } from "stream";

const prisma = new PrismaClient();

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAxgi_61jihrJJeLJR35Da6dHap2CVG8RJBQkAE9re5YWsro95Lc-rlL-3aSNMCUEqFK_Q7b3TUuak/pub?gid=0&single=true&output=csv";

type CsvProduct = {
  name?: string;
  category?: string;
  description?: string;
  price?: string;
  stock?: string;
};

const results: CsvProduct[] = [];

https.get(CSV_URL, (response) => {
  const stream = Readable.from(response);

  stream
    .pipe(csv())
    .on("data", (data: CsvProduct) => results.push(data))

    .on("end", async () => {
      try {
        console.log(results);

        // BORRAR PRODUCTOS ANTERIORES
        await prisma.product.deleteMany();

        // BUSCAR ADMIN
        const admin = await prisma.admin.findFirst();

        if (!admin) {
          console.log("No admin found");
          process.exit(1);
        }

        // CREAR PRODUCTOS
        for (const item of results) {
          await prisma.product.create({
            data: {
              name: item.name || "",
              category: item.category || "",
              description: item.description || "",
              price: Number(item.price) || 0,
              stock: Number(item.stock) || 0,
              available: true,
              adminId: admin.id,
              specs: [],
            },
          });
        }

        console.log("Productos importados desde Google Sheets");
      } catch (error) {
        console.error(error);
      } finally {
        await prisma.$disconnect();
      }
    });
});
