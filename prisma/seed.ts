import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { localUsers, localAds } from "./seeds/local";
import { cloudUsers, cloudAds } from "./seeds/cloud";
import { createHash } from "crypto";

const connectionString = process.env.DATABASE_URL;
const environment = process.env.SEED_ENV || "local";

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

console.log("🔌 Connecting to:", connectionString.split("@")[1]);
console.log("🌍 Environment:", environment);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function hashPassword(plainPassword: string): string {
  return createHash("sha256").update(plainPassword).digest("hex");
}

async function main() {
  console.log("🌱 Starting seed...");

  const users = environment === "cloud" ? cloudUsers : localUsers;
  const adsFactory = environment === "cloud" ? cloudAds : localAds;

  const user1 = await prisma.user.upsert({
    where: { email: users[0].email },
    update: { password: hashPassword(users[0].password), name: users[0].name },
    create: { ...users[0], password: hashPassword(users[0].password) },
  });
  console.log("✅ User1:", user1.email);

  const user2 = await prisma.user.upsert({
    where: { email: users[1].email },
    update: { password: hashPassword(users[1].password), name: users[1].name },
    create: { ...users[1], password: hashPassword(users[1].password) },
  });
  console.log("✅ User2:", user2.email);

  await prisma.ad.deleteMany({
    where: { userId: { in: [user1.id, user2.id] } },
  });
  console.log("🗑️  Existing ads deleted");

  const ads = await prisma.ad.createMany({
    data: adsFactory(user1.id, user2.id),
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