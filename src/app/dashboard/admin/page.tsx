import { redirect } from "next/navigation";
import { getTokenFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddGameForm from "@/components/AddGameForm";

export default async function AdminPage() {
  const payload = getTokenFromCookies()!;
  if (payload.role !== "admin") redirect("/dashboard");

  const games = await prisma.game.findMany({
    include: { _count: { select: { users: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AddGameForm />

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <h3 className="text-white font-semibold mb-4">Existing Games</h3>
          <div className="space-y-2">
            {games.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between bg-gray-700/50 rounded px-3 py-2 text-sm"
              >
                <span className="text-white">{g.title}</span>
                <span className="text-gray-400">{g._count.users} players</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
