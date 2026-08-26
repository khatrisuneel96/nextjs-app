import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      posts: {
        create: [
          {
            title: "Hello Prisma",
            content: "Getting started with Prisma Postgres.",
            published: true,
          },
          {
            title: "Draft notes",
            content: "Work in progress.",
            published: false,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Bob's first post",
            content: "Sharing a few thoughts.",
            published: true,
          },
        ],
      },
    },
  });

  console.log(`Seeded users: ${alice.email}, ${bob.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
