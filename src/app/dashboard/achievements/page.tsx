import { getTokenFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AchievementsPage() {
  const payload = getTokenFromCookies()!;

  const achievements = await prisma.achievement.findMany({
    where: { userId: payload.userId },
    orderBy: { earnedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Your Achievements</h1>

      {achievements.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm">No achievements yet. Keep playing!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className="bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 flex items-start gap-4"
            >
              <div>
                <p className="text-white font-medium">{a.title}</p>
                <p className="text-gray-400 text-sm">{a.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Earned {a.earnedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}