import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@gaming.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@gaming.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  const player = await prisma.user.upsert({
    where: { email: "player@gaming.com" },
    update: {},
    create: {
      username: "gamer123",
      email: "player@gaming.com",
      password: hashedPassword,
      role: "player",
    },
  });

  const games = await Promise.all([
    prisma.game.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        title: "Cyber Warriors",
        genre: "Action",
        description: "An intense action game set in a futuristic city.",
        imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/726980/e606ba96659ba4da2b4657077443b88fa1ec201d/header.jpg?t=1762541783",
      },
    }),
    prisma.game.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        title: "Space Odyssey",
        genre: "Adventure",
        description: "Explore the universe and discover new planets.",
        imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2435980/header.jpg?t=1721478427",
      },
    }),
    prisma.game.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        title: "Dragon Quest",
        genre: "RPG",
        description: "Battle dragons and collect legendary weapons.",
        imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/574050/header.jpg?t=1778838737",
      },
    }),
  ]);

  await prisma.userGame.upsert({
    where: { userId_gameId: { userId: player.id, gameId: games[0].id } },
    update: {},
    create: {
      userId: player.id,
      gameId: games[0].id,
      hoursPlayed: 45,
      score: 8500,
    },
  });

  await prisma.userGame.upsert({
    where: { userId_gameId: { userId: player.id, gameId: games[1].id } },
    update: {},
    create: {
      userId: player.id,
      gameId: games[1].id,
      hoursPlayed: 20,
      score: 4200,
    },
  });

  await prisma.achievement.createMany({
    data: [
      {
        userId: player.id,
        title: "First Blood",
        description: "Win your first game",
      },
      {
        userId: player.id,
        title: "Speed Runner",
        description: "Complete a level in under 2 minutes",
      },
    ],
  });

  console.log("Database seeded successfully!");
  console.log("Admin: admin@gaming.com / password123");
  console.log("Player: player@gaming.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
