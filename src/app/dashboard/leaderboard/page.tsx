import { prisma } from "@/lib/prisma";
import LeaderboardTable from "@/components/LeaderboardTable";

export default async function LeaderboardPage() {
  const leaderboardRaw = await prisma.userGame.groupBy({
    by: ["userId"],
    _sum: { score: true, hoursPlayed: true },
  });

  const userIds = leaderboardRaw.map((e) => e.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true },
  });

  const leaderboard = leaderboardRaw
    .map((entry) => ({
      userId: entry.userId,
      username: users.find((u) => u.id === entry.userId)?.username || "Unknown",
      totalScore: entry._sum.score || 0,
      totalHours: entry._sum.hoursPlayed || 0,
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Leaderboard</h1>
      <LeaderboardTable data={leaderboard} />
    </div>
  );
}
