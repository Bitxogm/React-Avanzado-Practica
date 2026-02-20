import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

console.log("🔌 Connecting to:", connectionString.split("@")[1]); // muestra host sin credenciales

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  const user1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: { password: "123456", name: "Carlos García" },
    create: { email: "user1@example.com", password: "123456", name: "Carlos García" },
  });
  console.log("✅ User1:", user1.email);

  const user2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: { password: "123456", name: "Ana Martínez" },
    create: { email: "user2@example.com", password: "123456", name: "Ana Martínez" },
  });
  console.log("✅ User2:", user2.email);

  await prisma.ad.deleteMany({
    where: { userId: { in: [user1.id, user2.id] } },
  });
  console.log("🗑️  Existing ads deleted");

  const ads = await prisma.ad.createMany({
    data: [
      {
        title: "Bicicleta de montaña",
        description: "Bicicleta en perfecto estado, poco uso.",
        price: 350,
        tags: ["deporte", "bicicleta"],
        userId: user1.id,
      },
      {
        title: "iPhone 13 Pro",
        description: "iPhone 13 Pro 256GB, con caja original.",
        price: 750,
        tags: ["tecnología", "móvil"],
        userId: user1.id,
      },
      {
        title: "Mesa de madera",
        description: "Mesa de comedor de roble macizo para 6 personas.",
        price: 200,
        tags: ["hogar", "muebles"],
        userId: user2.id,
      },
      {
        title: "Guitar Fender Stratocaster",
        description: "Guitarra eléctrica Fender, incluye funda.",
        price: 600,
        tags: ["música", "guitarra"],
        userId: user2.id,
      },
    ],
  });
  console.log(`✅ Ads created: ${ads.count}`);
  console.log("🎉 Seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });