import { getTokenFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardOverviewPage() {
  const payload = getTokenFromCookies()!;

  const userGames = await prisma.userGame.findMany({
    where: { userId: payload.userId },
  });

  const achievementsCount = await prisma.achievement.count({
    where: { userId: payload.userId },
  });

  const totalScore = userGames.reduce((sum, ug) => sum + ug.score, 0);
  const totalHours = userGames.reduce((sum, ug) => sum + ug.hoursPlayed, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-1">
        Welcome back, {payload.username}!
      </h1>
      <p className="text-gray-400 mb-8">
        {payload.role === "admin" ? "Admin Dashboard" : "Your gaming dashboard"}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <p className="text-gray-400 text-sm">Games in Library</p>
          <p className="text-3xl font-bold text-white mt-1">{userGames.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Score</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">
            {totalScore.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <p className="text-gray-400 text-sm">Hours Played</p>
          <p className="text-3xl font-bold text-white mt-1">{totalHours}h</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <p className="text-gray-400 text-sm">Achievements</p>
          <p className="text-3xl font-bold text-white mt-1">{achievementsCount}</p>
        </div>
      </div>
    </div>
  );
}