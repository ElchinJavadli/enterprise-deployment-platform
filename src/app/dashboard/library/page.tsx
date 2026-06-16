import { getTokenFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LibraryGameCard from "@/components/LibraryGameCard";

export default async function LibraryPage() {
  const payload = getTokenFromCookies()!;

  const userGames = await prisma.userGame.findMany({
    where: { userId: payload.userId },
    include: { game: true },
    orderBy: { addedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">My Library</h1>

      {userGames.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm">
            Your library is empty. Go to{" "}
            <a href="/dashboard/games" className="text-purple-400 hover:underline">
              All Games
            </a>{" "}
            to add some.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userGames.map((ug) => (
            <LibraryGameCard
              key={ug.id}
              userGameId={ug.id}
              gameId={ug.game.id}
              title={ug.game.title}
              genre={ug.game.genre}
              imageUrl={ug.game.imageUrl}
              hoursPlayed={ug.hoursPlayed}
              score={ug.score}
            />
          ))}
        </div>
      )}
    </div>
  );
}