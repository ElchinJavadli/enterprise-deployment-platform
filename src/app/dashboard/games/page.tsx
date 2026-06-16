import { getTokenFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import GameCard from "@/components/GameCard";

export default async function GamesPage() {
  const payload = getTokenFromCookies()!;

  const [games, userGames] = await Promise.all([
    prisma.game.findMany({
      include: { _count: { select: { users: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.userGame.findMany({
      where: { userId: payload.userId },
      select: { gameId: true },
    }),
  ]);

  const libraryGameIds = new Set(userGames.map((ug) => ug.gameId));

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">All Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            inLibrary={libraryGameIds.has(game.id)}
          />
        ))}
      </div>
    </div>
  );
}
