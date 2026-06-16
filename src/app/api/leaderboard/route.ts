import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leaderboard = await prisma.userGame.groupBy({
      by: ["userId"],
      _sum: { score: true, hoursPlayed: true },
    });

    

    const userIds = leaderboard.map((entry: any) => entry.userId);

    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true },
    });

    const result = leaderboard
    .map((entry: any) => {
        const user = users.find((u: any) => u.id === entry.userId);
        return {
          userId: entry.userId,
          username: user?.username || "Unknown",
          totalScore: entry._sum.score || 0,
          totalHours: entry._sum.hoursPlayed || 0,
        };
      })
.sort((a: any, b: any) => b.totalScore - a.totalScore).slice(0, 10);

    return NextResponse.json({ leaderboard: result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}
